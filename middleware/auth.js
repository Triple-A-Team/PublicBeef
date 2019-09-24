const multer = require('multer')

/**
 * Middleware that returns a 403 error if not logged in. 
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next()
    else next({ status: 403, message: 'Unauthorized' })
}



module.exports = {
    isLoggedIn
}