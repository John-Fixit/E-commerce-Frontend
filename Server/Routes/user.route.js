const express = require('express');
const userRouter = express.Router();
const userController = require('../Controller/user.controller')
userRouter.get('/', userController.getLandingPage)
userRouter.post('/signup', userController.signup)
userRouter.post('/signin', userController.signin)
userRouter.get('/home', userController.home)

module.exports = userRouter