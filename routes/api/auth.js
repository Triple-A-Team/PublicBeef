const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const bcryptSalt = 10
const router = express.Router()
const User = require('../../models/User')

/**
 * Create a user and log that user in
 * @example
 * POST /api/signup
 */
router.post('/signup', (req, res, next) => {
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const { username, password, location, role } = req.body

    User.findOne({ username })
        .then(userDoc => {
            if (userDoc !== null) {
                res.status(409).json({ message: 'The username already exists' })
                return
            }
            const userData = { username, password: bcrypt.hashSync(password, salt), location, role }
            const newUser = new User(userData)
            return newUser.save()
        })
        .then(userSaved => {
            req.logIn(userSaved, () => {
                userSaved.password = undefined
                res.json(userSaved)
            })
        })
        .catch(err => next(err))
})

/**
 * Log in a user using passport.authenticate
 * @example
 * POST /api/login
 */
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong' })
            return
        }

        if (!user) {
            res.status(401).json(failureDetails)
            return
        }

        req.login(user, err => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' })
                return
            }

            res.json(req.user)
        })
    })(req, res, next)
})

/**
 * Log out a user using passport.logout
 * @example
 * POST /api/login
 */
router.get('/logout', (req, res) => {
    req.logout()
    res.json({ message: 'You are out!' })
})

module.exports = router