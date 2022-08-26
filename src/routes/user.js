const express = require('express');
const { userController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const userRoute = express.Router();

userRoute.post('/', validators.bodyUser, userController.create);
userRoute.get('/', auth.verify, userController.getAll);

module.exports = userRoute;