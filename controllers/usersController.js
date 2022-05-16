const userService = require('../services/usersService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const newUser = await userService.createUser(displayName, email, password, image);
  if (!newUser.success) return res.status(newUser.code).json({ message: newUser.message });

  return res.status(newUser.code).json({ token: newUser.data.token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const logUser = await userService.logUser(email, password);
  if (!logUser.success) return res.status(logUser.code).json({ message: logUser.message });

  return res.status(logUser.code).json({ token: logUser.data.token });
};

const readAllUsers = async (req, res) => {
  const userList = await userService.queryAllUsers();
  if (!userList.success) return res.status(userList.code).json({ message: userList.message });

  return res.status(userList.code).json(userList.data);
};

const readUserById = async (req, res) => {
  const { id } = req.params;

  const userById = await userService.queryUserById(id);
  if (!userById.success) return res.status(userById.code).json({ message: userById.message });

  return res.status(userById.code).json(userById.data);
};

module.exports = {
  createUser,
  login,
  readAllUsers,
  readUserById,
};
