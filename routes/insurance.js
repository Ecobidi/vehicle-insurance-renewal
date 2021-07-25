const router = require('express').Router()
const InsuranceController = require('../controllers/insurance')

router.get('/', InsuranceController.getAllInsurances)

router.get('/renew', InsuranceController.getRenewInsurancePage)

router.post('/renew', InsuranceController.handleRenewInsurance)

router.get('/new', InsuranceController.createInsurancePage)

router.post('/new', InsuranceController.createInsurance)

router.get('/remove/:insurance_id', InsuranceController.removeInsurance)

module.exports = router