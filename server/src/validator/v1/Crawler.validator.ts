import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import BaseValidator from './Base.validator';

class CrawlerValidator extends BaseValidator {
  crawl = async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = Joi.object({
      url: Joi.string().uri().required(),
    });

    this.validateBody(validationSchema, req, res, next);
  };
}

export default new CrawlerValidator();
