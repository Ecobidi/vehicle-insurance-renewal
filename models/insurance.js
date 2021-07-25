const mongoose = require('mongoose')

const InsuranceSchema = new mongoose.Schema({
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'policy',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customer',
  },
  customer_name: String,
  sum_assured: Number,
  insurance_start_date: String,
  insurance_end_date: String,
  nominee_name: String,
  document_image: {
    url: String,
    public_id: String,
  },
  number_of_installments: Number,
  vehicle_chasis_number: String,
  vehicle_engine_number: String,
  vehicle_model: String,
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = mongoose.model('insurance', InsuranceSchema)