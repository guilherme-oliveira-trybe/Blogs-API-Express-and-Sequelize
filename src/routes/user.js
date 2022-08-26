const express = require('express');
const { userController } = require('../controllers');
const { validators } = require('../middlewares');

const userRoute = express.Router();

userRoute.post('/', validators.bodyUser, userController.create);

module.exports = userRoute;