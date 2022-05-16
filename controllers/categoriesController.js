const categoriesController = require('../services/categoriesServices');

const createCategorie = async (req, res) => {
  const { name } = req.body;

  const createdCategorie = await categoriesController.createCategorie(name);
  if (!createdCategorie.success) {
    return res.status(createdCategorie.code).json({ message: createdCategorie.message });
  }

  return res.status(createdCategorie.code).json(createdCategorie.data);
};

const readAllCategories = async (req, res) => {
  const categoriesList = await categoriesController.queryallCategories();
  if (!categoriesList.success) {
    return res.status(categoriesList.code).json(categoriesList.message);
  }

  return res.status(categoriesList.code).json(categoriesList.data);
};

module.exports = {
  createCategorie,
  readAllCategories,
};
