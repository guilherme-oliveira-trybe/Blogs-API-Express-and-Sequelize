const express = require('express');
const { postController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const postRoute = express.Router();

postRoute.post('/', auth.verify, validators.bodyPost, postController.create);
postRoute.get('/', auth.verify, postController.getAll);

module.exports = postRoute;