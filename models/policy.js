const mongoose = require('mongoose')

const PolicySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // months
    required: true,
  },
  cost: Number,
  description: Number,
})

module.exports = mongoose.model('policy', PolicySchema)