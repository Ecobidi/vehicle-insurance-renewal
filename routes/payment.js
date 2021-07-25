const router = require('express').Router()
const PaymentController = require('../controllers/payment')

router.get('/', PaymentController.getAllPayments)

// router.get('/view/:driver_id', PaymentController.getSingleDriverPage)

// router.get('/edit/:driver_id', PaymentController.updateDriverPage)

// router.post('/edit/:driver_id', PaymentController)

router.get('/new', PaymentController.createPaymentPage)

router.post('/new', PaymentController.createPayment)

router.get('/remove/:payment_id', PaymentController.removePayment)

module.exports = router