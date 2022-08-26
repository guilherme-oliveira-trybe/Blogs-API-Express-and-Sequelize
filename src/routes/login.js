const express = require('express');
const { loginController } = require('../controllers');
const { validators } = require('../middlewares');

const loginRoute = express.Router();

loginRoute.post('/', validators.bodyLogin, loginController.login);

module.exports = loginRoute;