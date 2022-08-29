const { userService } = require('../services');

const userController = {
  getAll: async (_req, res) => {
    const result = await userService.getAll();

    return res.status(200).json(result);
  },
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await userService.create({ displayName, email, password, image });

    return res.status(201).json(result);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const result = await userService.getOne(id);

    res.status(200).json(result);
  },
  delete: async (req, res) => {
    const { userEmail } = req;

    await userService.delete({ userEmail });

    return res.status(204).end();
  },
};

module.exports = userController;