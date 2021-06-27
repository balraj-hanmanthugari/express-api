exports.catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

exports.errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message
    });
}

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith('4') ? 'fail': 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;