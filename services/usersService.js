const Joi = require('joi');
const jwt = require('jsonwebtoken');

const SECRET = require('../config/secret');

const { User } = require('../models');

const createUserValidations = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
});

const logUserValidations = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const responseMaker = (success = true, code = 201, message = '') => ({ success, code, message });

const validateUniqueEmail = async (email) => {
  const userEmail = await User.findAll({ where: { email } });
  if (userEmail.length) return responseMaker(false, 409, 'User already registered');

  return responseMaker();
};

const validateUser = async (displayName, email, password) => {
  const { error } = createUserValidations.validate({ displayName, email, password });
  if (error) return responseMaker(false, 400, error.message);

  const validateUniqueEmailResponse = await validateUniqueEmail(email);
  if (!validateUniqueEmailResponse.success) return validateUniqueEmailResponse;

  return responseMaker();
};

const validateLogin = async (email, password) => {
  const { error } = logUserValidations.validate({ email, password });
  if (error) return responseMaker(false, 400, error.message);

  if (!email || !password) return responseMaker(false, 400, 'Invalid fields');

  const user = await User.findOne({ where: { email } });
  if (!user) return responseMaker(false, 400, 'Invalid fields');

  return responseMaker();
};

const createUser = async (displayName, email, password, image) => {
  try {
    const validateUserResponse = await validateUser(displayName, email, password);
    if (!validateUserResponse.success) return validateUserResponse;

    const validateUniqueEmailResponse = await validateUniqueEmail(email);
    if (!validateUniqueEmailResponse.success) return validateUniqueEmailResponse;

    const newUser = await User.create({ displayName, email, password, image });
    const token = jwt.sign(newUser.dataValues, SECRET, {
      algorithm: 'HS256',
    });

    const response = responseMaker();
    response.data = { newUser, token };

    return response;
  } catch (e) {
    return responseMaker(false, 400, e);
  }
};

const logUser = async (email, password) => {
  try {
    const validateLoginResponse = await validateLogin(email, password);
    if (!validateLoginResponse.success) return validateLoginResponse;

    const user = await User.findOne({ where: { email } });
    const token = jwt.sign(user.dataValues, SECRET, {
      algorithm: 'HS256',
    });
  
    const response = responseMaker(true, 200);
    response.data = { token };
  
    return response;
  } catch (e) {
    return responseMaker(false, 400, e);
  }
};

const queryAllUsers = async () => {
  try {
    const usersList = await User.findAll();

    const response = responseMaker(true, 200, '');
    response.data = usersList; // ARRAY<<<

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

const queryUserById = async (id) => {
  try {
    const userById = await User.findOne({ where: { id } });

    if (!userById) return responseMaker(false, 404, 'User does not exist');

    const response = responseMaker(true, 200);
    response.data = userById;

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

module.exports = {
  createUser,
  logUser,
  queryAllUsers,
  queryUserById,
};
