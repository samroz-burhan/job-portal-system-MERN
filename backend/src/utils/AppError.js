class AppError extends Error {
    constructor(message, statusCode = 500, details = null){
        super(message);
        
        this.statusCode = statusCode;
        this.status = statusCode >= 500 ? "error" : "fail";
        this.isOperational = true;
        this.details = detail;

        Error.captureStackTrace(this, this.contructor);
    }
}

export default AppError;