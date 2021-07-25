const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  middle_name: String,
  last_name: {
    type: String,
    required: true,
  },
  fullname: String,
  nin: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  city: String,
  lga_of_origin: {
    type: String,
  },
  state_of_origin: String,
  photo: {
    url: String,
    public_id: String,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  }
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('customer', CustomerSchema)