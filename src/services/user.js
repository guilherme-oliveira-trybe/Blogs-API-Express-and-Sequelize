require('dotenv').config();
const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new CustomError(401, 'JWT_KEY não foi definido no .env');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });

    if (user) throw new CustomError(409, 'User already registered');

    const userCreated = await User.create({ displayName, email, password, image });

    if (!userCreated) throw new CustomError(400, 'Unable to create user');

    const token = jwt.sign({ email }, JWT_SECRET);

    return { token };
  },
};

module.exports = userService;