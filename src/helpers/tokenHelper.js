require('dotenv').config();
const jwt = require('jsonwebtoken');
const { CustomError } = require('../errors');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = { algorithm: 'HS256', expiresIn: '1d' };

if (!JWT_SECRET) throw new CustomError(401, 'JWT_KEY não foi definido no .env');

const tokenHelper = {
  createToken: (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, JWT_CONFIG);
    return token;
  },
  verifyToken: (token) => {
    try {
      const dados = jwt.verify(token, JWT_SECRET);
      return dados;
    } catch (error) {
      if (error) throw new CustomError(401, 'Expired or invalid token');
    }
  },
};

module.exports = tokenHelper;