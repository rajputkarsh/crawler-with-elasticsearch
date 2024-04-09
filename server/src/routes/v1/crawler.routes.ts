import { Router, Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE, MESSAGES } from '../../constants';
import { crawlerValidator } from '../../validator';
import { ICrawlerRequest } from '../../interfaces/request/crawler';
import { crawlerController } from '../../controller';

const crawlerRouter = Router();

crawlerRouter.post(
  '/',
  crawlerValidator.crawl,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { url } = req.body as ICrawlerRequest;
      const result = await crawlerController.webScrape(url);
      res
        .status(HTTP_STATUS_CODE.OK)
        .send(MESSAGES.SUCCESS.URL_CRAWL_STARTED(result));
    } catch (error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);

export default crawlerRouter;
