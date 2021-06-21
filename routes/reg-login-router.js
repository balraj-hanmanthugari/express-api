const regLoginController = require('./../controllers/reg-login-controller');
const express = require('express');
const regLoginRouter = express.Router();

regLoginRouter
.route('/checkEmailId')
.post(regLoginController.checkEmailId);

regLoginRouter
.route('/register')
.post(regLoginController.registerUser);

regLoginRouter
.route('/login')
.post(regLoginController.loginUser);

regLoginRouter
.route('/logout')
.get(regLoginController.logoutUser);

module.exports = regLoginRouter;