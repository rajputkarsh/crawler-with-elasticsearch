import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import BaseValidator from './Base.validator';

class ClientsValidator extends BaseValidator {
  add = async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      registrationDate: Joi.string().isoDate().required(),
      companyCategory: Joi.string().required(),
      companySubCategory: Joi.string().required(),
      companyClass: Joi.string().required(),
      cin: Joi.string().length(21).required(),
      pin: Joi.string().length(6).required(),
      state: Joi.string().required(),
      address: Joi.string().required(),
      roc: Joi.string().required(),
      status: Joi.string().required(),
    });

    this.validateBody(validationSchema, req, res, next);
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = Joi.object({
      uuid: Joi.string().optional(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      registrationDate: Joi.string().required(),
      companyCategory: Joi.string().required(),
      companySubCategory: Joi.string().required(),
      companyClass: Joi.string().required(),
      cin: Joi.string().length(21).required(),
      pin: Joi.string().length(6).required(),
      state: Joi.string().required(),
      address: Joi.string().required(),
      roc: Joi.string().required(),
      status: Joi.string().required(),
    });

    this.validateBody(validationSchema, req, res, next);
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = Joi.object({
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional(),
    });

    this.validateQuery(validationSchema, req, res, next);
  };

  search = async (req: Request, res: Response, next: NextFunction) => {
    const validationSchema = Joi.object({
      q: Joi.string().min(1).required(),
      page: Joi.number().min(1).optional(),
      limit: Joi.number().min(1).optional(),
    });

    this.validateQuery(validationSchema, req, res, next);
  };
}

export default new ClientsValidator();
