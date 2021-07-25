const PaymentService = require('../services/payment')
const InsuranceService = require('../services/insurance')

class PaymentController {

  static async getAllPayments(req, res) {
    let payments
    if (req.query.mode && req.query.mode == "by_insurance_id") {
      payments = await PaymentService.findByInsuranceId(req.query.search) 
    } else if (req.query.mode && req.query.mode == "by_customer_name") {
      payments = await PaymentService.findByCustomerName(req.query.search) 
    } else {
      payments = await PaymentService.findAll()
    }
    res.render('payments', { payments})
  }

  // static async getSingleCustomerPage(req, res) {
  //   let customer = await PaymentService.findById(req.params.customer_id)
  //   if (!customer) {
  //     req.flash('error_msg', 'ID does not match any customer')
  //     return res.redirect('/payments')
  //   }
  //   res.render('customer-info', {customer})
  // }

  static async createPaymentPage(req, res) {
    let insurances = await InsuranceService.findAll()
    res.render('payments-edit', { edit: false, insurances })
  }

  static async createPayment(req, res) {
    let dao = req.body
    try {
      let insurance = await InsuranceService.findById(dao.insurance)
      if (!insurance) throw new Error('invalid insurance id passed')
      dao.customer_name = insurance.customer.fullname
      await PaymentService.save(dao)
      req.flash('success_msg', 'Payment successfully saved')
      res.redirect('/payments')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating payment')
      req.redirect('/payments')
    }
  }

  // static async updatecustomerPage(req, res) {
  //   try {
  //     let customer = await PaymentService.findById(req.params.customer_id)
  //     if (!customer) {
  //       req.flash('error_msg', 'No customer Found With Such ID')
  //       return res.redirect('/payments')
  //     } 
  //     res.render('payments-edit', { customer, edit: true })
  //   } catch (error) {
  //     console.log(error)
  //     req.flash('error_msg', 'An Error Occurred')
  //     req.redirect('/payments')
  //   }
  // }

  static async removePayment(req, res) {
    try {
      await PaymentService.removeOne(req.params.payment_id)
      res.redirect('/payments')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/payments')
    }
  }

}

module.exports = PaymentController