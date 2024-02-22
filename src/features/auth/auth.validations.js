import Joi from 'joi';

import { PasswordValidator } from '../../core/validation/index.js';

/**
 * Authentication Validations
 */
export default class AuthValidations {

    /**
     * Validates POST requests to /api/auth/register
     */
    static register = {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(PasswordValidator.validateJoi),
            // repeatPassword: Joi.string().required().valid(Joi.ref('password')),
        }),
    };

    /**
     * Validates POST requests to /api/auth/login
     */
    static login = {
        body: Joi.object().keys({
            email: Joi.string().required(), password: Joi.string().required(),
        }),
    };

    /**
     * Validates POST requests to /api/auth/logout
     */
    static logout = {
        body: Joi.object().keys({
            token: Joi.string().required(),
        }),
    };
}
