
 const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
 }
export default asyncHandler



/*
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
       
    }
}

module.exports = asyncHandler
*/









// This utility can be used to wrap async route handlers to catch errors and pass them to Express error handlers
// Example usage:
// const asyncHandler = require('./utils/asyncHandler');
// app.get('/route', asyncHandler(async (req, res, next) => { ... }));