const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  googleID: String,
  credits: { type: Number, default: 5 }
})

mongoose.model('users', userSchema)
