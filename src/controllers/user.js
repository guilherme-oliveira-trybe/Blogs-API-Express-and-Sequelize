const { userService } = require('../services');

const userController = {
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const result = await userService.create({ displayName, email, password, image });

    res.status(201).json(result);
  },
};

module.exports = userController;