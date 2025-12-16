const ApiError = require("../utils/ApiError");

function formatValidationErrors(err) {
    // Mongoose ValidationError
    if (err && err.errors) {
        const details = Object.keys(err.errors).map((k) => ({ field: k, message: err.errors[k].message }));
        return details;
    }
    return null;
}

/**
 * Not found middleware - forwards ApiError(404)
 */
function notFound(req, res, next) {
    return next(ApiError.notFound("Resource not found"));
}

/**
 * Main error handler - single source of truth for error responses
 */
function handler(err, req, res, next) {
    // If it's already an ApiError, use it. Otherwise, try to map common error shapes.
    let apiErr = err;

    // Mongoose duplicate key
    if (!apiErr || apiErr.name === "MongoError" || apiErr.code === 11000) {
        if (err && err.code === 11000) {
            apiErr = ApiError.conflict("Duplicate key error");
            apiErr.details = err.keyValue || null;
        }
    }

    // Mongoose validation error
    if (err && err.name === "ValidationError") {
        apiErr = ApiError.badRequest("Validation failed", formatValidationErrors(err));
    }

    // JWT errors
    if (err && (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError")) {
        apiErr = ApiError.unauthorized(err.message || "Invalid token");
    }

    if (!(apiErr instanceof ApiError)) {
        // unknown error -> wrap as internal
        apiErr = ApiError.internal(err && err.message ? err.message : "Internal Server Error");
    }

    // logging - can wire to a logger here (winston, pino, etc.)
    // operational errors are expected and can be logged at info/warn; others at error
    if (!apiErr.isOperational) {
        // eslint-disable-next-line no-console
        console.error("Unhandled Error:", err);
    } else {
        // eslint-disable-next-line no-console
        console.warn("API Error:", apiErr.message);
    }

    const payload = {
        status: "error",
        message: apiErr.message,
    };

    if (apiErr.details) payload.details = apiErr.details;

    res.status(apiErr.status || 500).json(payload);
}

module.exports = { handler, notFound };
