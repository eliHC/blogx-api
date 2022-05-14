const Joi = require('joi');

const { BlogPost, Category, User } = require('../models');

const createPostValidations = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const responseMaker = (success = true, code = 201, message = '') => ({ success, code, message });

const createPost = async ({ userId, title, content, categoryIds }) => {
  try {
    const { error } = createPostValidations.validate({ title, content, categoryIds });
    if (error) return responseMaker(false, 400, error.message);
  
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (!categories.length) return responseMaker(false, 400, '"categoryIds" not found');

    const newPost = await BlogPost.create({ userId, title, content, categoryIds });
    const response = responseMaker();
    response.data = newPost;

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

const queryAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories' },
      ],
    });
    if (!allPosts.length) return responseMaker(false, 400, 'blablablalbblabllabla');

    const response = responseMaker(true, 200);// << lembrar 200 
    response.data = allPosts;

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

module.exports = {
  createPost,
  queryAllPosts,
};
