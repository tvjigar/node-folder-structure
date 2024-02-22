import Joi from 'joi';
import {
    ObjectIdValidator,
} from '../../core/validation/index.js';

/**
 * User Validations
 */
export default class UserValidations {

    /**
     * Validates GET requests to /api/user/
     */
    static getUsers = {};

    /**
     * Validates GET requests to /api/user/:userId
     */
    static getUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
    };

    /**
     * Validates PATCH requests to /api/user/:userId
     */
    static updateUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
        body: Joi.object().keys({
            email: Joi.string().email(),
        }).min(1),
    };

    /**
     * Validates DELETE requests to /api/user/:userId
     */
    static deleteUser = {
        params: Joi.object().keys({
            userId: Joi.string().required().custom(ObjectIdValidator.validateJoi),
        }),
    };
}
