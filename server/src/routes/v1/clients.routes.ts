import { NextFunction, Request, Response, Router } from 'express';
import { HTTP_STATUS_CODE, MESSAGES } from '../../constants';
import { clientsValidator } from '../../validator';
import { clientsController } from '../../controller';
import { IClient } from '../../interfaces/model/client';

const clientsRouter = Router();

clientsRouter.get(
  '/',
  clientsValidator.list,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string) : 1;
      const pageSize = limit ? parseInt(limit as string) : 25;
      const result = await clientsController.list(pageNumber, pageSize);
      res.status(HTTP_STATUS_CODE.OK).send(
        MESSAGES.SUCCESS.CLIENTS_LIST({
          page: pageNumber,
          limit: pageSize,
          data: result,
        }),
      );
      res.send;
    } catch (error: any) {
      console.log(`error -- `, error);
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);

clientsRouter.get(
  '/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.params;

      if (!uuid) {
        res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(MESSAGES.ERROR.BAD_REQUEST);
        return;
      }

      const result = await clientsController.findByUUID(uuid);

      res
        .status(HTTP_STATUS_CODE.OK)
        .send(MESSAGES.SUCCESS.CLIENT_INFORMATION(result || {}));
    } catch (error: any) {
      console.log(`error -- `, error);
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);

clientsRouter.post(
  '/',
  clientsValidator.add,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as Exclude<IClient, 'uuid'>;
      const result = await clientsController.save(data);

      res
        .status(HTTP_STATUS_CODE.OK)
        .send(MESSAGES.SUCCESS.CLIENT_SAVED(result || {}));
    } catch (error: any) {
      console.log(`error -- `, error);
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);

clientsRouter.post(
  '/:uuid',
  clientsValidator.update,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.params;
      if (!uuid) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(MESSAGES.ERROR.BAD_REQUEST);
        return;
      }

      const data = req.body as Exclude<IClient, 'uuid'>;
      const result = await clientsController.update(uuid, data);

      res
        .status(HTTP_STATUS_CODE.OK)
        .send(MESSAGES.SUCCESS.CLIENT_UPDATED(result || {}));
    } catch (error: any) {
      console.log(`error -- `, error);
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);



clientsRouter.delete(
  '/:uuid',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.params;

      if (!uuid) {
        res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(MESSAGES.ERROR.BAD_REQUEST);
        return;
      }

      const result = await clientsController.delete(uuid);

      res
        .status(HTTP_STATUS_CODE.OK)
        .send(MESSAGES.SUCCESS.CLIENT_DELETED(result || {}));
    } catch (error: any) {
      console.log(`error -- `, error);
      res
        .status(error?.status || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .json(error);
    }
  },
);

export default clientsRouter;
