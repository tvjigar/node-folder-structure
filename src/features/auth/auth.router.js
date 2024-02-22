import express from 'express';
import { ValidationMiddlewares } from '../../core/validation/index.js';
import AuthController from './auth.controller.js';
import AuthValidations from './auth.validations.js';

const AuthRouter = express.Router();

/**
 * Method: POST
 * Path: /api/auth/register
 */
AuthRouter.post(
    '/register',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.register),
    AuthController.register
);

/**
 * Method: POST
 * Path: /api/auth/login
 */
AuthRouter.post(
    '/login',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.login),
    AuthController.login
);

/**
 * Method: POST
 * Path: /api/auth/logout
 */
AuthRouter.post(
    '/logout',
    ValidationMiddlewares.createRequestDataValidator(AuthValidations.logout),
    AuthController.logout
);

export default AuthRouter;
