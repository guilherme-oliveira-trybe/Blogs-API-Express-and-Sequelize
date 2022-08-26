const errorMiddleware = require('./errors');
const validators = require('./validators');
const auth = require('./auth');

module.exports = { errorMiddleware, validators, auth };