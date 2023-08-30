// Third Party Imports.
const jwt = require('jsonwebtoken');

/**
 * @function auth
 * @description Authentication middleware.
 * @param {Object} req - Request object.
 * @param {Object} res - Response object.
 * @param {Function} next - Next function.
 * @returns {Function} Next function.
 */
module.exports = function (req, res, next) {
    // Check if token exists and it is valid.
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            console.log(req.headers.authorization.toString())
            // Get token.
            token = req.headers.authorization.split(' ')[1].toString();

            console.log(token)
            // Verify token.
            const decoded = jwt.verify(token, "randomString");
            // Set user.
            req.user = decoded.user;
            next();
        } catch (error) {
            // Return error.
            res.status(error.status || 500).json({
                message: error.message || "Server Error"
            });
        }
    }
};