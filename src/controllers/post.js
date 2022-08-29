const { postService } = require('../services');

const postController = {
  getAll: async (_req, res) => {
    const result = await postService.getAll();

    return res.status(200).json(result);
  },
  getBySearchTerm: async (req, res) => {
    const { q: searchTerm } = req.query;
    const result = await postService.getBySearchTerm(searchTerm);
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

    return res.status(200).json(result);
  },
  update: async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userEmail } = req;

    const result = await postService.update({ userEmail, title, content, id });

    return res.status(200).json(result);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const { userEmail } = req;

    await postService.delete({ userEmail, id });

    return res.status(204).end();
  },
};

module.exports = postController;