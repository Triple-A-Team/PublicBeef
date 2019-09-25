const multer = require('multer')

/**
 * Middleware that returns a 403 error if not logged in. 
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next()
    else next({ status: 403, message: 'Unauthorized' })
}

/**
 * Middleware that redirects based on if the user is an admin
 */
const adminAuth = (req, res, next) => {
    if (!req.user) {
        req.flash('failure', 'please log in to use this feature')
        res.redirect('/login')
    }
    if (!req.user.isAdmin) {
        req.flash('failure', 'you do not have access to this feature')
        res.redirect('/')
    }
    next()
}

module.exports = {
    isLoggedIn,
    adminAuth
}