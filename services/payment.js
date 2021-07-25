const PaymentModel = require('../models/payment')

class PaymentService {
  
  static async findByInsuranceId(insurance_id) {
    return PaymentModel.find({ insurance: insurance_id }).sort('-date_of_payment').populate('insurance').exec()
  }

  static async findByCustomerName(name) {
    let pattern = new RegExp(name, 'ig')
    return PaymentModel.find({ customer_name: pattern }).sort('-date_of_payment').populate('insurance').exec()
  }

  static async findById(id) {
    return PaymentModel.findById(id).sort('-date_of_payment').populate('insurance').exec()
  }
  
  static async findAll() {
    return PaymentModel.find().sort('-date_of_payment').populate('insurance').exec()
  }

  static async save(dao) {
    return PaymentModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return PaymentModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return PaymentModel.findByIdAndRemove(id)
  }

}

module.exports = PaymentService