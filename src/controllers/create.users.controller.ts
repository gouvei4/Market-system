import CreateUserService from '../services/create.users.service';
import { Router } from 'express';

class CreaterUserController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('', CreateUserService.createUser);
  }
}

export default new CreaterUserController();
