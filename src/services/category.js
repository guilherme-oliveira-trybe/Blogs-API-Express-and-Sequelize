const { CustomError } = require('../errors');
const { Category } = require('../database/models');

const categoryService = {
  getAll: async () => {
    const result = await Category.findAll();

    return result;
  },
  create: async ({ name }) => {
    const category = await Category.findOne({ where: { name } });

    if (category) throw new CustomError(409, 'Category already registered');

    const { id } = await Category.create({ name });

    if (!id) throw new CustomError(400, 'Unable to create category');

    return { id, name };
  },
};

module.exports = categoryService;