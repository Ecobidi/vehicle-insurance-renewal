const PolicyService = require('../services/policy')

class PolicyController {

  static async getAllPolicies(req, res) {
    let policies
    if (req.query.search && req.query.search > 1) {
      policies = await PolicyService.findByName(req.query.search)
    } else {
      policies = await PolicyService.findAll()
    }
    res.render('policies', { policies })
  }

  static async createPolicy(req, res) {
    let dao = req.body
    try {
      await PolicyService.save(dao)
      req.flash('success_msg', 'Policy Created')
      res.redirect('/policies')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating policy')
      req.redirect('/policies')
    }
  }

  static async removePolicy(req, res) {
    try {
      await PolicyService.removeOne(req.params.policy_id)
      res.redirect('/policies')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/policies')
    }
  }

}

module.exports = PolicyController