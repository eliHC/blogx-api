const Joi = require('joi');

const { Category } = require('../models');

const createCategorieValidations = Joi.object({
  name: Joi.string().required(),
});

const responseMaker = (success = true, code = 201, message = '') => ({ success, code, message });

const createCategorie = async (name) => {
  try {
    const { error } = createCategorieValidations.validate({ name });
    if (error) return responseMaker(false, 400, error.message);
  
    const newCategorie = await Category.create({ name });
    const response = responseMaker();
    response.data = newCategorie;

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

const queryallCategories = async () => {
  try {
    const categoriesList = await Category.findAll();
    const response = responseMaker(true, 200);
    response.data = categoriesList;

    return response;
  } catch (e) {
    return responseMaker(false, 500, e.message);
  }
};

module.exports = {
  createCategorie,
  queryallCategories,
};
