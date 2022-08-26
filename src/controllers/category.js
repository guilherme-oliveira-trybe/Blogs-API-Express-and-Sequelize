const { categoryService } = require('../services');

const categoryController = {
  // getAll: async (_req, res) => {
  //   const result = await userService.getAll();

  //   return res.status(200).json(result);
  // },
  create: async (req, res) => {
    const { name } = req.body;
    const result = await categoryService.create({ name });

    return res.status(201).json(result);
  },
  // getOne: async (req, res) => {
  //   const { id } = req.params;
  //   const result = await userService.getOne(id);

  //   res.status(200).json(result);
  // },
};

module.exports = categoryController;