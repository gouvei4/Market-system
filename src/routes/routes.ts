import express from 'express';
import CreaterUserController from '../controllers/create.users.controller';
import ListUserController from '../controllers/list.user.controller';
import LoginUserController from '../controllers/login.user.controller';

const routes = express.Router();

routes.get('/', function (req, res) {
  res.json({ API: 'System Market - V 1.0.0' });
});

routes.use('/user/create', CreaterUserController.router);
routes.use('/list/users', ListUserController.router);
routes.use('/login', LoginUserController.router);

export default routes;
