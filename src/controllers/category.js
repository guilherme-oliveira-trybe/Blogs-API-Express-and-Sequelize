const { categoryService } = require('../services');

const categoryController = {
  getAll: async (_req, res) => {
    const result = await categoryService.getAll();

    return res.status(200).json(result);
  },
  create: async (req, res) => {
    const { name } = req.body;
    const result = await categoryService.create({ name });

    return res.status(201).json(result);
  },
};

module.exports = categoryController;