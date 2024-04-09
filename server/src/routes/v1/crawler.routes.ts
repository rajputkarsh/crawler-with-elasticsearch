import { Router, Request, Response, NextFunction } from 'express';
import { HTTP_STATUS_CODE } from '../../constants';

const crawlerRouter = Router();

crawlerRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {

  } catch(error: any) {
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);    
  }
})

export default crawlerRouter;
