const CustomerService = require('../services/customer')

class Customer {

  static async getAllCustomers(req, res) {
    let customers
    if (req.query.search && req.query.search.length > 1) {
      customers = await CustomerService.findByName(req.query.search) 
    } else {
      customers = await CustomerService.findAll()
    }
    res.render('customers', { customers})
  }

  static async getSingleCustomerPage(req, res) {
    let customer = await CustomerService.findById(req.params.customer_id)
    if (!customer) {
      req.flash('error_msg', 'ID does not match any customer')
      return res.redirect('/customers')
    }
    res.render('customer-info', {customer})
  }

  static async createCustomerPage(req, res) {
    res.render('customers-edit', { edit: false })
  }

  static async createCustomer(req, res) {
    let dao = req.body
    dao.fullname = `${dao.last_name} ${dao.first_name} ${dao.middle_name}`
    try {
      await CustomerService.save(dao)
      req.flash('success_msg', 'Customer Created')
      res.redirect('/customers')
    } catch (error) {
      console.log(error)
      req.flash('error_msg', 'Error creating customer')
      req.redirect('/customers')
    }
  }

  // static async updatecustomerPage(req, res) {
  //   try {
  //     let customer = await CustomerService.findById(req.params.customer_id)
  //     if (!customer) {
  //       req.flash('error_msg', 'No customer Found With Such ID')
  //       return res.redirect('/customers')
  //     } 
  //     res.render('customers-edit', { customer, edit: true })
  //   } catch (error) {
  //     console.log(error)
  //     req.flash('error_msg', 'An Error Occurred')
  //     req.redirect('/customers')
  //   }
  // }

  static async removeCustomer(req, res) {
    try {
      await CustomerService.removeOne(req.params.customer_id)
      res.redirect('/customers')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/customers')
    }
  }

}

module.exports = Customer