const express = require('express')
require('./services/passport')

const app = express()

// require returns the function that was exported
require('./routes/authRoutes')(app)

// Dynamic Port Binding
const PORT = process.env.PORT || 5000
// will get PORT from environment variables OR 5000 (if no env var defined)
app.listen(PORT)
