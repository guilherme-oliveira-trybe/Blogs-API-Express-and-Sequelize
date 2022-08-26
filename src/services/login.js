const { User } = require('../database/models');
const { tokenHelper } = require('../helpers');
const { CustomError } = require('../errors');

const loginService = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) throw new CustomError(400, 'Invalid fields');

    const token = tokenHelper.createToken({ email });

    return { token };
  },
};

module.exports = loginService;