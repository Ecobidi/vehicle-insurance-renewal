const InsuranceService = require('../services/insurance')
const PolicyService = require('../services/policy')
const CustomerService = require('../services/customer')

class InsuranceController {

  static async getAllInsurances(req, res) {
    let insurances
    if (req.query.search) {
      insurances = await InsuranceService.findByCustomerName(req.query.search)
    } else {
      insurances = await InsuranceService.findAll()
    }
    res.render('insurances', { insurances })
  }

  static async getRenewInsurancePage(req, res) {
    let insurance_id = req.query.insurance_id
    let insurance
    if (insurance_id) {
      insurance = await InsuranceService.findById(insurance_id)
      if (!insurance) {
        req.flash('error_msg', 'ID does not match any insurance')
        return res.redirect('/insurances/renew')
      } else {
        return res.render('insurances-renew', { insurance, renewInsurance: true })
      }
    }  
    
    return res.render('insurances-renew', { renewInsurance: false })
  }

  static async handleRenewInsurance(req, res) {
    let dao = req.body
    try {
      await InsuranceService.updateOne(req.body.insurance_id, dao)
      req.flash('success_msg', 'Insurance Successfully Renewed')
      res.redirect('/insurances')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error renewing insurance')
      res.redirect('/insurances/renew')
    }
  }

  static async createInsurancePage(req, res) {
    let customers = await CustomerService.findAll()
    let policies = await PolicyService.findAll()
    res.render('insurances-edit', { edit: false, customers, policies })
  }

  static async createInsurance(req, res) {
    let dao = req.body
    try {
      let customer = await CustomerService.findById(dao.customer)
      dao.customer_name = customer.fullname
      await InsuranceService.save(dao)
      req.flash('success_msg', 'Insurance created')
      res.redirect('/insurances')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error ')
      req.redirect('/insurances')      
    }
  }

  static async removeInsurance(req, res) {
    try {
      await InsuranceService.removeOne(req.params.insurance_id)
      res.redirect('/insurances')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/insurances')
    }
  }

}

module.exports = InsuranceController