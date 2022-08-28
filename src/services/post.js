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
  // getOne: async (id) => {
  //   const user = await User.findByPk(id, {
  //     attributes: { exclude: ['password'] },
  //   });

  //   if (!user) throw new CustomError(404, 'User does not exist');

  //   return user;
  // },
};

module.exports = postService;