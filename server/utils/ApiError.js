class ApiError extends Error {
    /**
     * ApiError: standard error for the API
     * @param {number} statusCode HTTP status code
     * @param {string} message human friendly message
     * @param {boolean} isOperational whether this is an expected/operational error
     * @param {object} details optional extra details (validation errors etc.)
     */
    constructor(statusCode = 500, message = "Internal Server Error", isOperational = true, details = null) {
        super(message);
        this.name = "ApiError";
        this.status = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad Request", details = null) {
        return new ApiError(400, message, true, details);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message, true);
    }

    static notFound(message = "Not Found") {
        return new ApiError(404, message, true);
    }

    static conflict(message = "Conflict") {
        return new ApiError(409, message, true);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(500, message, false);
    }
}

module.exports = ApiError;
