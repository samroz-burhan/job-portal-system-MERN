const errorHandlerMiddleware = (err, req, res, next) => {
    // 1. Check whether response has already been sent
    if (res.headersSent) {
        return next(err);
    }

    // 2. Default error values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // 3. Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = "Database validation failed";
    }

    // 4. Handle invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID";
    }

    // 5. Handle duplicate MongoDB values
    if (err.code === 11000) {
        statusCode = 409;
        message = "Resource already exists";
    }

    // 6. Check environment
    const isProduction = process.env.NODE_ENV === "production";

    // 7. Hide unexpected error details in production
    if (
        !err.isOperational &&
        !["ValidationError", "CastError"].includes(err.name) &&
        err.code !== 11000
    ) {
        statusCode = 500;
        message = isProduction ? "Something went wrong" : err.message;
    }

    // 8. jwt errors
    if (
        err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError" ||
        err.name === "NotBeforeError"
    ) {
        statusCode = 401;
        message = "Invalid or expired token";
    }

    // 9. Log errors on the server
    console.error(err);

    // Send response to frontend
    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || []
    });
};

export default errorHandlerMiddleware;
