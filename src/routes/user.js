const express = require('express');
const { userController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const userRoute = express.Router();

userRoute.get('/', auth.verify, userController.getAll);
userRoute.get('/:id', auth.verify, userController.getOne);
userRoute.post('/', validators.bodyUser, userController.create);
userRoute.delete('/me', auth.verify, userController.delete);

module.exports = userRoute;