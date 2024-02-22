import httpStatus from 'http-status';
import { ApiError } from '../../core/error/index.js';

/**
 * User Exceptions
 */
export default class UserExceptions {

    /**
     * Status Code: BAD_REQUEST
     *
     * @returns {ApiError}
     */
    static EMAIL_TAKEN = () => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
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
}
