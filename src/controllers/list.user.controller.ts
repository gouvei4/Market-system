import ListUsersService from '../services/list.user.service';
import { Router } from 'express';

class ListUserController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('', ListUsersService.listService);
  }
}

export default new ListUserController();
