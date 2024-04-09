import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer';
import { IClient } from '../../interfaces/model/client';
import { generateUUID } from '../../utils';
import { clientsDao } from '../../dao/';
import elasticSearch from '../../elastic-search';

const DETAILS_CLASSNAME = '.justify-content-between';
const CONTAINER_CLASSNAME = '.banklisting';
const COMPANY_DETAILS_ID = '#basicdetails';
const COMPANY_STATUS_ID = '#COMPANY-STATUS';
const CONTACT_DETAILS_ID = '#CONTACT-DETAILS';

class CrawlerController {
  _getInnerHTML(
    element: ElementHandle<Element | HTMLHeadingElement> | null,
  ): Promise<string> {
    if (!element) return new Promise((res) => res(''));
    return element.evaluate(
      (el) => el.innerHTML.split('\t').at(-1) || el.innerHTML,
    );
  }
  _getAnchor(
    element: ElementHandle<HTMLAnchorElement> | null,
  ): Promise<string> | null {
    if (!element) return element;
    return element.evaluate((el) => el.href);
  }

  async _getURL(
    elements: Array<ElementHandle<Element>>,
  ): Promise<Array<string>> {
    const urlPromises = elements.map(async (element) => {
      const titleAnchor = await element.$('a');
      const url = await this._getAnchor(titleAnchor);
      return url || '';
    });
    const companyURLs: Array<string> = await Promise.all(urlPromises);
    return companyURLs;
  }

  async _fetchCompanyURLs(
    divElements: Array<Array<ElementHandle<Element>>>,
  ): Promise<Array<string>> {
    try {
      const elementPromises = divElements.map(async (div) => {
        const promise = await this._getURL(div);
        return promise;
      });
      const urls: Array<Array<string>> = await Promise.all(elementPromises);
      const flattenedURLs: Array<string> = urls.flat(2);
      return flattenedURLs;
    } catch (error) {
      throw error;
    }
  }

  async _fetchDivChildren(
    elements: ElementHandle<Element>[],
  ): Promise<Array<Array<ElementHandle<Element>>>> {
    const divChildPromises: Array<Promise<Array<ElementHandle<Element>>>> =
      elements.map(async (element: ElementHandle<Element>) => {
        const divChild = await element.$$('.col-md-4');
        return divChild;
      });

    const divChildren = await Promise.all(divChildPromises);
    return divChildren;
  }

  async _handleCompanyInformation(page: Page, url: string): Promise<string> {
    await page.goto(url);
    const informationContainer = await page.$(COMPANY_DETAILS_ID);

    if (!informationContainer) {
      return '';
    }

    const [
      nameElement,
      activityElement,
      cinElement,
      registrationDateElement,
      categoryElement,
      subCategoryElement,
      companyClassElement,
      ..._
    ] = await informationContainer.$$(DETAILS_CLASSNAME);

    const contactDetails = await informationContainer.$(CONTACT_DETAILS_ID);
    const companyStatusDetails = await informationContainer.$(
      COMPANY_STATUS_ID,
    );
    if (!contactDetails || !companyStatusDetails) {
      return '';
    }
    const [
      stateElement,
      pincodeElement,
      countryElement,
      addressElement,
      emailElement,
    ] = await contactDetails.$$(DETAILS_CLASSNAME);

    const stateContainer = await stateElement.$('h6');

    if (!stateContainer) {
      return '';
    }

    const [rocElement, statusElement] = await companyStatusDetails.$$(
      DETAILS_CLASSNAME,
    );

    const name = await nameElement.$('h6');
    const registrationDate = await registrationDateElement.$('h6');
    const category = await categoryElement.$('h6');
    const subCategory = await subCategoryElement.$('h6');
    const companyClass = await companyClassElement.$('h6');
    const cin = await cinElement.$('h6');
    const state = await stateContainer.$('a');
    const pincode = await pincodeElement.$('h6');
    const address = await addressElement.$('h6');
    const email = await emailElement.$('h6');
    const roc = await rocElement.$('h6');
    const status = await statusElement.$('h6');

    const nameText = await this._getInnerHTML(name);
    const registrationDateText = await this._getInnerHTML(registrationDate);
    const categoryText = await this._getInnerHTML(category);
    const subCategoryText = await this._getInnerHTML(subCategory);
    const companyClassText = await this._getInnerHTML(companyClass);
    const cinText = await this._getInnerHTML(cin);
    const stateText = await this._getInnerHTML(state);
    const pincodeText = await this._getInnerHTML(pincode);
    const addressText = await this._getInnerHTML(address);
    const emailText = await this._getInnerHTML(email);
    const rocText = await this._getInnerHTML(roc);
    const statusText = await this._getInnerHTML(status);

    const companyInfo: IClient = {
      uuid: generateUUID(),
      name: nameText,
      email: emailText,
      registrationDate: registrationDateText,
      companyCategory: categoryText,
      companySubCategory: subCategoryText,
      companyClass: companyClassText,
      cin: cinText,
      pin: pincodeText,
      state: stateText,
      address: addressText,
      roc: rocText,
      status: statusText,
    };

    await clientsDao.save(companyInfo);
    await elasticSearch.saveClient(companyInfo);
    return nameText;
  }

  async _handleCompanyURLS(
    browser: Browser,
    urls: Array<string>,
  ): Promise<void> {
    const pool = [];
    const results = [];

    for (const url of urls) {
      const page = await browser.newPage();
      pool.push(page);
      results.push(await this._handleCompanyInformation(page, url));
    }
    await Promise.all(results);
    await Promise.all(pool.map((page) => page.close()));
  }

  async webScrape(url: string): Promise<{}> {
    let browser;
    try {
      browser = await puppeteer.launch({});
      const page = await browser.newPage();
      await page.goto(url);

      const elements = await page.$$(CONTAINER_CLASSNAME);
      const divChildren = await this._fetchDivChildren(elements);
      const companyURLs: Array<string> = await this._fetchCompanyURLs(
        divChildren,
      );

      this._handleCompanyURLS(browser, companyURLs);

      return {};
    } catch (error) {
      throw error;
    }
  }
}

export default new CrawlerController();
