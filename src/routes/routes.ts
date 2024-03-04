import express from 'express';
import CreaterUserController from '../controllers/create.users.controller';
import ListUserController from '../controllers/list.user.controller';
import LoginUserController from '../controllers/login.user.controller';
import CreateTypeController from '../controllers/create.category.controller';
import ListCategoryController from '../controllers/list.category.controller';
import CreateProductController from '../controllers/create.products.controller';

const routes = express.Router();

routes.get('/', function (req, res) {
  res.json({ API: 'System Market - V 1.0.0' });
});

routes.use('/user/create', CreaterUserController.router);
routes.use('/list/users', ListUserController.router);
routes.use('/login', LoginUserController.router);
routes.use('/user/category', CreateTypeController.router);
routes.use('/user/category', ListCategoryController.router);
routes.use('/user/category/products', CreateProductController.router);


export default routes;
