const express = require ('express')
const adminRouter = express()
const adminController = require('../Controller/admin.controller')
adminRouter.post('/signup', adminController.signup)
adminRouter.post('/signin', adminController.signin)
adminRouter.get('/home', adminController.authorizeUser)

module.exports = adminRouter