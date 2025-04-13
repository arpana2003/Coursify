class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Calls the constructor of the parent class

        this.statusCode = statusCode;

        // Captures the stack trace, excluding the constructor call from the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;



