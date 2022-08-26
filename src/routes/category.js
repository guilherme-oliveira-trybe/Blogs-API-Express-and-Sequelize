const express = require('express');
const { categoryController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const categoriesRoute = express.Router();

categoriesRoute.post('/', auth.verify, validators.bodyCategory, categoryController.create);
categoriesRoute.get('/', auth.verify, categoryController.getAll);

module.exports = categoriesRoute;