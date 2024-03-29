import httpStatus from 'http-status';
import { ApiError } from '../../core/error/index.js';

/**
 * Exceptions
 */
export default class Exceptions {

    /**
     * Status Code: BAD_REQUEST
     *
     * @returns {ApiError}
     */
    static EMAIL_TAKEN = () => {
        return new ApiError({
            statusCode: httpStatus.NOT_FOUND,
            message: 'Email already in use',
        });
    };

    /**
     * Status Code: NOT_FOUND
     *
     * @returns {ApiError}
     */
    static USER_NOT_FOUND = () => {
        return new ApiError({
            statusCode: httpStatus.NOT_FOUND,
            message: 'User not found',
        });
    };

    /**
     * Status Code: UNAUTHORIZED
     *
     * @returns {ApiError}
     */
  static EMAIL_PASSWORD_WRONG = (res) => {
        return new ApiError({
            statusCode: httpStatus.UNAUTHORIZED,
            message: 'Wrong email or password',
        });
    };

    /**
     * Status Code: INTERNAL_SERVER_ERROR
     *
     * @returns {ApiError}
     */
    static ACCOUNT_VERIFICATION_FAILED = () => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            message: 'Account verification failed',
        });
    };

    /**
     * Status Code: BAD_REQUEST
     *
     * @returns {ApiError}
     */
    static ACCOUNT_ALREADY_VERIFIED = () => {
        return new ApiError({
            statusCode: httpStatus.BAD_REQUEST,
            message: 'Account already verified',
        });
    };

    /**
     * Status Code: INTERNAL_SERVER_ERROR
     *
     * @returns {ApiError}
     */
    static PASSWORD_RESET_FAILED = () => {
        return new ApiError({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Password reset failed',
        });
    };
}
