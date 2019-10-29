const axios = require('axios')
const express = require('express')
const router = express.Router()

const service = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    withCredentials: true,
})


/** 
 * Reverse lookup on lat long.
 * @example
 * GET /api/map/reverse
 * */
router.get('/reverse', async(req, res, next) => {
    service.get(`/${req.query.lat},${req.query.lon}.json`, {
            params: {
                access_token: process.env.MAPBOX_TOKEN
            }
        })
        .then(result => {
            res.status(200).json(result.data)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({ error })
        })
})

module.exports = router