const Joi = require('joi');
const { CustomError } = require('../errors');

const validators = {
  bodyLogin: async (req, _res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().min(1).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, 'Some required fields are missing');

    next();
  },
  bodyUser: async (req, _res, next) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required(),
      email: Joi.string().email().min(1).required(),
      password: Joi.string().min(6).required(),
      image: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, error.details[0].message);

    next();
  },
};

module.exports = validators;