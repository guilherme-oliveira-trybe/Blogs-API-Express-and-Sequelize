const Joi = require('joi');
const { CustomError } = require('../errors');

const validators = {
  bodyLogin: async (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().min(1).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, 'Some required fields are missing');

    next();
  },
};

module.exports = validators;