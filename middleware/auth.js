const multer = require('multer')

/**
 * Middleware that returns a 403 error if not logged in. 
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next()
    else next({ status: 403, message: 'Unauthorized' })
}


/** 
 * Uploads an avatar file
 */
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


module.exports = {
    isLoggedIn,
    upload
}