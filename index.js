const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send({ bye: 'buddy boo' })
})

// Dynamic Port Binding
const PORT = process.env.PORT || 5000
// will get PORT from environment variables OR 5000 (if not env var defined)
app.listen(PORT)
