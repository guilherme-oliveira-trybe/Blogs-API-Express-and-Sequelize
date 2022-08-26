require('dotenv').config();
const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors');
const { User } = require('../database/models');

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new CustomError(401, 'JWT_KEY não foi definido no .env');

const loginService = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) throw new CustomError(400, 'Invalid fields');

    const token = jwt.sign({ email }, JWT_SECRET);

    return { token };
  },
};

module.exports = loginService;