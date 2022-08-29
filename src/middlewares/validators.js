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
  bodyCategory: async (req, _res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, error.details[0].message);

    next();
  },
  bodyPost: async (req, _res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().min(1).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, 'Some required fields are missing');

    next();
  },
  bodyPostUpdate: async (req, _res, next) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) throw new CustomError(400, 'Some required fields are missing');

    next();
  },
};

module.exports = validators;