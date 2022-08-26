const { tokenHelper } = require('../helpers');
const { CustomError } = require('../errors');

const auth = {
  verify: async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('auth', authorization);

    if (!authorization) throw new CustomError(401, 'Token not found');

    tokenHelper.verifyToken(authorization);
    
    next();
  },
};

module.exports = auth;