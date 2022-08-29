const { tokenHelper } = require('../helpers');
const { CustomError } = require('../errors');
const { User } = require('../database/models');

const userService = {
  getAll: async () => {
    const result = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    return result;
  },
  create: async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });

    if (user) throw new CustomError(409, 'User already registered');

    const userCreated = await User.create({ displayName, email, password, image });

    if (!userCreated) throw new CustomError(400, 'Unable to create user');

    const token = tokenHelper.createToken({ email });

    return { token };
  },
  getOne: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new CustomError(404, 'User does not exist');

    return user;
  },
  delete: async ({ userEmail }) => {
    const { id } = await User.findOne({ where: { email: userEmail } });

    return User.destroy({ where: { id } });
  },
};

module.exports = userService;