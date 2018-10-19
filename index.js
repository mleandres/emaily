const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long for cookie to last (this is 30 days)
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

// require returns the function that was exported
require('./routes/authRoutes')(app)

// Dynamic Port Binding
const PORT = process.env.PORT || 5000
// will get PORT from environment variables OR 5000 (if no env var defined)
app.listen(PORT)
