const express = require('express')
const User = require('../models/User')
const { isLoggedIn } = require('../middleware/auth')
const router = express.Router()

/** 
 * Get all users within a specific distance.
 * TODO: Change this to a post so we can input a distance.
 * @example
 * GET /api/users/search?lat=20&lon=-60
 * GET /api/users/search?lat=20&lon=-60&maxDist=100
 * */
// Route to get all users
router.get('/search', (req, res, next) => {
    const lat = req.query.lat || 25.756365
    const lon = req.query.lon || -80.375716
    const maxDist = req.query.maxDist || 32186.9 // 20 miles

    console.log(`Searching for users near ${lat}, ${lon} within ${maxDist} meters`)
    User.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lon, lat]
                    },
                    $maxDistance: maxDist
                }
            }
        })
        .then(users => {
            res.json(users)
        })
        .catch(err => next(err))
})
module.exports = router