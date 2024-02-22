import express from 'express';
import { ValidationMiddlewares } from '../../core/validation/index.js';
import { AuthMiddlewares } from '../../features/auth/index.js';
import UserController from './user.controller.js';
import UserValidations from './user.validations.js';
import UserMiddlewares from './user.middlewares.js';

const UserRouter = express.Router();

/**
 * Method: GET
 * Path: /api/user/
 */
UserRouter.get(
    '/',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.getUsers),
    UserController.getUsers
);


/**
 * Method: GET
 * Path: /api/user/:userId
 */
UserRouter.get(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.getUser),
    UserController.getUser
);

/**
 * Method: PATCH
 * Path: /api/user/:userId
 */
UserRouter.patch(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.updateUser),
    UserController.updateUser
);

/**
 * Method: DELETE
 * Path: /api/user/:userId
 */
UserRouter.delete(
    '/:userId',
    AuthMiddlewares.createAuthGuard(),
    UserMiddlewares.createMountUserFromToken(),
    ValidationMiddlewares.createRequestDataValidator(UserValidations.deleteUser),
    UserController.deleteUser
);

export default UserRouter;
