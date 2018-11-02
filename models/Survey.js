const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient')

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0},
  // this will be a reference to the id of the user that this survey belongs to
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
  deleted: { type: Boolean, default: false }
})

mongoose.model('surveys', surveySchema)
