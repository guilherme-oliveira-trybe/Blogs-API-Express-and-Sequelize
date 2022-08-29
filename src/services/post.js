const { CustomError } = require('../errors');
const { BlogPost, PostCategory, User, Category, sequelize } = require('../database/models');

const postService = {
  getAll: async () => {
    const result = await BlogPost.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
    });

    return result;
  },
  getBySearchTerm: async (searchTerm) => {
    const allPosts = await BlogPost.findAll({ include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
    });
    if (!searchTerm) return allPosts;
    
    const result = await allPosts
    .filter((p) => p.title.includes(searchTerm) || p.content.includes(searchTerm));

    if (!result) return [];    
    return result;
  },
  create: async ({ title, content, userEmail, categoryIds }) => {
    const { id: userId } = await User.findOne({ where: { email: userEmail } });
    
    await sequelize.transaction(async (transaction) => {
      const { id: postId } = await BlogPost.create({ title, content, userId }, { transaction });
      
      if (!postId) throw new CustomError(400, 'Unable to create user');
      
      try {
        const arrCategory = categoryIds.map((categoryId) => ({ postId, categoryId }));
        await PostCategory.bulkCreate(arrCategory, { transaction });
      } catch (error) {
        throw new CustomError(400, '"categoryIds" not found');
      }
    });
    
    const post = await BlogPost.findOne({ where: { title } });
    
    return post;
  },
  getOne: async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
    });

    if (!post) throw new CustomError(404, 'Post does not exist');

    return post;
  },
  update: async ({ userEmail, title, content, id: postId }) => {
    const { id } = await User.findOne({ where: { email: userEmail } });
    const post = await BlogPost.findByPk(postId);

    if (id !== post.userId) throw new CustomError(401, 'Unauthorized user');

    await BlogPost.update({ title, content }, { where: { id: postId } });

    const postUpdated = await BlogPost.findByPk(postId, { include: [{
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
    });

    return postUpdated;
  },
  delete: async ({ userEmail, id: postId }) => {
    const { id } = await User.findOne({ where: { email: userEmail } });
    const post = await BlogPost.findByPk(postId);

    if (!post) throw new CustomError(404, 'Post does not exist');
    if (id !== post.userId) throw new CustomError(401, 'Unauthorized user');

    return BlogPost.destroy({ where: { id: postId } });
  },
};

module.exports = postService;