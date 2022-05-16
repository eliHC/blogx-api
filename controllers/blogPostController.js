const blogPostServices = require('../services/blogPostsService');

const createPost = async (req, res) => {
  const { user } = req;
  const { title, content, categoryIds } = req.body;

  const createdPost = await blogPostServices
    .createPost({ userId: user.id, title, content, categoryIds });

  if (!createdPost.success) {
    return res.status(createdPost.code).json({ message: createdPost.message });
  }

  return res.status(createdPost.code).json(createdPost.data);
};

const readAllPosts = async (req, res) => {
  const getUserById = await blogPostServices.queryAllPosts();
  if (!getUserById.success) {
    return res.status(getUserById.code).json({ message: getUserById.message });
  }

  return res.status(getUserById.code).json(getUserById.data);
};

module.exports = {
  createPost,
  readAllPosts,
};
