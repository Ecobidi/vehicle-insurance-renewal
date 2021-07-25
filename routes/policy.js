const router = require('express').Router()
const PolicyController = require('../controllers/policy')

router.get('/', PolicyController.getAllPolicies)

router.post('/new', PolicyController.createPolicy)

router.get('/remove/:policy_id', PolicyController.removePolicy)

module.exports = router