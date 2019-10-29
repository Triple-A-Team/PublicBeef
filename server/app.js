const path = require('path')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const nocache = require('nocache')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');

const User = require('./models/User')
const connectToDB = require('./configs/database')
connectToDB()

// default value for title local
const app = express();
app.locals.title = 'Public Beef';

// Set "Access-Control-Allow-Origin" header
app.use(
    cors({
        origin: (origin, cb) => {
            cb(null, process.env.NODE_ENV !== 'production')
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
)
app.use(nocache())

// Auth Setup - Enable authentication using session + passport
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'insecure-secret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
)
require('./passport')(app)
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));

app.use(flash());
app.use((req, res, next) => {
    if (req.user) req.user.isAdmin = req.user.role === "Admin"
    res.locals.currentUser = req.user;
    res.locals.sessionFlash = req.session.sessionFlash;
    res.locals.failureMsg = req.flash('failure')
    res.locals.messageMsg = req.flash('message')
    res.locals.successMsg = req.flash('success')
    delete req.session.sessionFlash;
    next();
})

// Middleware Setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve(path.join(__dirname, '../client/build/public'))));

//Backend Routes
app.use(`/api/`, require('./routes/auth'))
app.use(`/api/users`, require('./routes/user'))
app.use(`/api/posts`, require('./routes/post'))
app.use(`/api/chat`, require('./routes/chat'))
app.use(`/api/messages`, require('./routes/messages'))
app.use(`/api/comments`, require('./routes/comment'))

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use('/api/*', (req, res, next) => {
    let err = new Error(`API Route Not Found: ${req.baseUrl}`)
    err.status = 404
    next(err)
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err)

    if (!res.headersSent) {
        res.status(err.status || 500)
        if (process.env.NODE_ENV === 'production') res.json(err)
        else
            res.json(JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err))))
    }
})

module.exports = app;