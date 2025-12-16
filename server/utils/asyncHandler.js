/**
 * asyncHandler(fn)
 * Wrap async Express handlers to centralize try/catch and forward errors to next()
 * Usage: module.exports = { myHandler: asyncHandler(async (req,res) => { ... }) }
 */
module.exports = function asyncHandler(fn) {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
