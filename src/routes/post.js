const express = require('express');
const { postController } = require('../controllers');
const { validators, auth } = require('../middlewares');

const postRoute = express.Router();

postRoute.get('/', auth.verify, postController.getAll);
postRoute.get('/search', auth.verify, postController.getBySearchTerm);
postRoute.get('/:id', auth.verify, postController.getOne);
postRoute.post('/', auth.verify, validators.bodyPost, postController.create);
postRoute.put('/:id', auth.verify, validators.bodyPostUpdate, postController.update);
postRoute.delete('/:id', auth.verify, postController.delete);

module.exports = postRoute;