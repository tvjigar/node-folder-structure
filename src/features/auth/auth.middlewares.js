import passport from 'passport';

import { ErrorExceptions } from '../../core/error/index.js';

import PassportJwtStrategy from './configs/passport-jwt-startegy.config.js';

/**
 * Authentication Middlewares
 */
export default class AuthMiddlewares {

    /**
     * Creates an express middleware function.
     *
     * It uses "passport.authenticate" to verify the JWT token from the authorization header with bearer schema.
     *
     * @returns {function}
     */
    static createAuthGuard = () => {
        return passport.authenticate(
            PassportJwtStrategy.name,
            { session: false },
            undefined,
        );
    };
}
