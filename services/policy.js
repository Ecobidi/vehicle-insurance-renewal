const PolicyModel = require('../models/policy')

class PolicyService {

  static async findByName(name) {
    let pattern = new RegExp(name, 'ig')
    return Policy.find({ name: pattern })
  }

  static async findById(id) {
    return PolicyModel.findById(id)
  }

  static async findAll(query = {}) {
    return PolicyModel.find(query)
  }

  static async save(dao) {
    return PolicyModel.create(dao)
  }

  static async updateOne(id, update_dao) {
    return PolicyModel.findByIdAndUpdate(id, {$set: update_dao})
  }

  static async removeOne(id) {
    return PolicyModel.findByIdAndRemove(id)
  }

}

module.exports = PolicyService