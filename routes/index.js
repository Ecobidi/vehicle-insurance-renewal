const adminRouter = require('express').Router()
const PolicyRouter = require('./policy')
const CustomerRouter = require('./customer')
const InsuranceRouter = require('./insurance')
const PaymentRouter = require('./payment')
const LoginRouter = require('./login')
const UserRouter = require('./user')

const authorization_middleware = (req, res, next) => {
  if (req.session?.user) next()
  else res.redirect('/login')
}

const logout = (req, res) => {
  req.session.user = null
  req.session.loggedIn = false
  res.redirect('/login')
}

adminRouter.use('/login', LoginRouter)

// adminRouter.use(authorization_middleware)

adminRouter.get('/', (req, res) => res.render('dashboard'))

adminRouter.get('/dashboard', (req, res) => res.render('dashboard'))

adminRouter.use('/policies', PolicyRouter)

adminRouter.use('/customers', CustomerRouter)

adminRouter.use('/insurances', InsuranceRouter)

adminRouter.use('/payments', PaymentRouter)

adminRouter.use('/users', UserRouter)

adminRouter.get('/logout', logout)

module.exports = adminRouter