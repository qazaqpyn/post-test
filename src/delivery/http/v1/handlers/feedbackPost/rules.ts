import { header } from 'express-validator';
import { authRequired, validateSchema } from '../../middlewares';

export const authorizedRules = [
  header('authorization').exists().notEmpty().isString(),
  authRequired({}),
  validateSchema
];