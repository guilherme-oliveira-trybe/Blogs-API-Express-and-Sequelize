const { tokenHelper } = require('../helpers');
const { CustomError } = require('../errors');
const { User } = require('../database/models');

const userService = {
  create: async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });

    if (user) throw new CustomError(409, 'User already registered');

    const userCreated = await User.create({ displayName, email, password, image });

    if (!userCreated) throw new CustomError(400, 'Unable to create user');

    const token = tokenHelper.createToken({ email });

    return { token };
  },
};

module.exports = userService;