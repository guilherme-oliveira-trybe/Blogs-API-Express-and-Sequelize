const express = require('express');
const { categoryController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', auth.verify, validators.bodyCategory, categoryController.create);

module.exports = categoriesRoute;