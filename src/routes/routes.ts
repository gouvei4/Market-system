import express from 'express';
import CreaterUserController from '../controllers/create.users.controller';

const routes = express.Router();


routes.get('/', function (req, res) {
  res.json({ API: 'System Market - V 1.0.0' });
});

routes.use('/user/create', CreaterUserController.router);

export default routes;