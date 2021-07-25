const router = require('express').Router()
const CustomerController = require('../controllers/customer')

router.get('/', CustomerController.getAllCustomers)

// router.get('/view/:driver_id', CustomerController.getSingleDriverPage)

// router.get('/edit/:driver_id', CustomerController.updateDriverPage)

// router.post('/edit/:driver_id', CustomerController)

router.get('/new', CustomerController.createCustomerPage)

router.post('/new', CustomerController.createCustomer)

router.get('/remove/:customer_id', CustomerController.removeCustomer)

module.exports = router