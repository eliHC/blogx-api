const express = require('express');

const usersController = require('./controllers/usersController');
const categoriesController = require('./controllers/categoriesController');
const blogPostController = require('./controllers/blogPostController');

const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
app.use(express.json());

app.route('/user')
  .post(usersController.createUser);

app.route('/login')
  .post(usersController.login);

//  chamar authMiddleware após essa linha
app.use(authMiddleware);
//
app.route('/user')
  .get(usersController.readAllUsers);

app.route('/user/:id')
  .get(usersController.readUserById);

app.route('/categories')
  .post(categoriesController.createCategorie)
  .get(categoriesController.readAllCategories);

app.route('/post')
  .post(blogPostController.createPost)
  .get(blogPostController.readAllPosts);

//---------------------------------------------------------
app.listen(3002, () => console.log('>> 3002!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send());
