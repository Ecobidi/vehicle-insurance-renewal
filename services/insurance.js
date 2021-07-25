const InsuranceSchema = require('../models/insurance')

class InsuranceService {
  
  static async findByCustomerName(name) {
    let pattern = new RegExp(name, 'ig')
    return InsuranceSchema.find({ fullname: pattern }).sort('-_id').populate('customer policy').exec()
  }

  static async findById(id) {
    return InsuranceSchema.findById(id).sort('-_id').populate('customer policy').exec()
  }
  
  static async findAll() {
    return InsuranceSchema.find().sort('-_id').populate('customer policy').exec()
  }

  static async save(dao) {
    return InsuranceSchema.create(dao)
  }

  static async updateOne(id, update_dao) {
    return InsuranceSchema.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return InsuranceSchema.findByIdAndRemove(id)
  }

}

module.exports = InsuranceService