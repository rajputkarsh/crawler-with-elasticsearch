import puppeteer, { ElementHandle, Page } from 'puppeteer';
import { IClient } from '../../interfaces/model/client';
import { generateUUID } from '../../utils';

const CONTAINER_CLASSNAME = '.banklisting';
const COMPANY_DETAILS_ID = '#basicdetails';
class CrawlerController {
  _getInnerHTML(
    element: ElementHandle<Element | HTMLHeadingElement> | null,
  ): Promise<string> | null {
    if (!element) return element;
    return element.evaluate((el) => el.innerHTML);
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

  async _getCompanyInfo(page: Page, url: string): Promise<IClient> {
    await page.goto(url);

    const informationContainer = await page.$$(COMPANY_DETAILS_ID);

    console.log(`informationContainer -- `, informationContainer);

    const companyInfo: IClient = {
      uuid: generateUUID(),
      name: '',
      email: '',
      registrationDate: '',
      companyCategory: '',
      companySubCategory: '',
      companyClass: '',
      cin: '',
      pin: '',
      state: '',
      address: '',
      roc: '',
      status: '',
    };
    return companyInfo;
  }

  async _handleCompanyURLS(
    page: Page,
    urls: Array<string>,
  ): Promise<Array<IClient>> {
    const companyArrayPromise: Array<Promise<IClient>> = urls.map(
      async (url) => {
        const companyInfo: IClient = await this._getCompanyInfo(page, url);
        return companyInfo;
      },
    );

    const companyInfoArray: Array<IClient> = await Promise.all(
      companyArrayPromise,
    );

    return companyInfoArray;
  }

  async webScrape(url: string): Promise<{}> {
    let browser;
    try {
      browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);

      const elements = await page.$$(CONTAINER_CLASSNAME);
      const divChildren = await this._fetchDivChildren(elements);
      const companyURLs: Array<string> = await this._fetchCompanyURLs(
        divChildren,
      );

      const companyData: Array<IClient> = await this._handleCompanyURLS(
        page,
        companyURLs,
      );

      console.log(`companyData -- `, companyData);

      return {};
    } catch (error) {
      console.log(`error -- `, error);
      throw error;
    }
  }
}

export default new CrawlerController();
