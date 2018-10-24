const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())

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
require('./routes/billingRoutes')(app)

// configure express to serve front end assets properly in production
if (process.env.NODE_ENV === 'production') {
  // have express serve up production assets such as main.js, and main.css
  app.use(express.static('client/build'))

  // want express to serve up index.html if it doesnt recognize route in prod 
  // (this will then direct react-router)
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Dynamic Port Binding
const PORT = process.env.PORT || 5000
// will get PORT from environment variables OR 5000 (if no env var defined)
app.listen(PORT)
