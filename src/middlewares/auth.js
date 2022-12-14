const { tokenHelper } = require('../helpers');
const { CustomError } = require('../errors');

const auth = {
  verify: async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(401, 'Token not found');

    const { email } = tokenHelper.verifyToken(authorization);
    req.userEmail = email;

    next();
  },
};

module.exports = auth;