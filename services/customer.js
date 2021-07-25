const CustomerModel = require('../models/customer')

class CustomerService {
  
  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return CustomerModel.find({ fullname: pattern })
  }

  static async findById(id) {
    return CustomerModel.findById(id)
  }
  
  static async findAll() {
    return CustomerModel.find()
  }

  static async save(dao) {
    return CustomerModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return CustomerModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return CustomerModel.findByIdAndRemove(id)
  }

}

module.exports = CustomerService