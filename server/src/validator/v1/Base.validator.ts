import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HTTP_STATUS_CODE, MESSAGES } from '../../constants';

class BaseValidator {
  constructor() {}

  async validateHeader(
    validator: Joi.ObjectSchema | Joi.ArraySchema,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { error: errors, value } = validator.validate(req.header, {
        abortEarly: false,
      });

      if (errors) {
        res.json(
          MESSAGES.ERROR.BAD_REQUEST(
            errors.details.map((error) => error.message).join(', '),
          ),
        );
        return false;
      }

      req.body = value;

      next();
    } catch (error) {
      res.json({
        status: MESSAGES.ERROR.INTERNAL_SERVER_ERROR(error as string),
        message: error,
      });
      return false;
    }
  }

  async validateBody(
    validator: Joi.ObjectSchema | Joi.ArraySchema,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { error: errors, value } = validator.validate(req.body, {
        abortEarly: false,
      });

      if (errors) {
        res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(
            MESSAGES.ERROR.BAD_REQUEST(
              errors.details.map((error) => error.message).join(', '),
            ),
          );
        return false;
      }

      req.body = value;

      next();
    } catch (error) {
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: MESSAGES.ERROR.INTERNAL_SERVER_ERROR(error as string),
        message: error,
      });
      return false;
    }
  }

  async validateQuery(
    validator: Joi.ObjectSchema | Joi.ArraySchema,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { error: errors, value } = validator.validate(req.query, {
        abortEarly: false,
      });

      if (errors) {
        res
          .status(HTTP_STATUS_CODE.BAD_REQUEST)
          .json(
            MESSAGES.ERROR.BAD_REQUEST(
              errors.details.map((error) => error.message).join(', '),
            ),
          );
        return false;
      }

      req.body = value;

      next();
    } catch (error) {
      res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: MESSAGES.ERROR.INTERNAL_SERVER_ERROR(error as string),
        message: error,
      });
      return false;
    }
  }
}

export default BaseValidator;
