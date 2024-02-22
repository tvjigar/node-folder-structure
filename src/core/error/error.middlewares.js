import ApiError from './errors/ApiError.js';

/**
 * Error Middlewares
 */
export default class ErrorMiddlewares {
    static converter = (error, req, res, next) => {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({
                success: false,
                message: error.message,
            });
          } else {            
            res.status(500).json({
                message: 'Internal Server Error',
                statusCode: 500,
            });
        }
    };
}
