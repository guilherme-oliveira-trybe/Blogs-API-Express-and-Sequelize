const { postService } = require('../services');

const postController = {
  getAll: async (_req, res) => {
    const result = await postService.getAll();

    return res.status(200).json(result);
  },
  create: async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { userEmail } = req;
    const result = await postService.create({ title, content, userEmail, categoryIds });

    return res.status(201).json(result);
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const result = await postService.getOne(id);

    res.status(200).json(result);
  },
};

module.exports = postController;