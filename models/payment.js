const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  insurance: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'insurance'
  },
  customer_name: String,
  date_of_payment: {
    type: String,
    required: true
  },
  which_installment: String,
  amount_paid: Number,
})

module.exports = mongoose.model('payment', PaymentSchema)