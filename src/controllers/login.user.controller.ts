import LoginUserService from '../services/login.user.service';
import { Router } from 'express';

class LoginUserController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('', LoginUserService.loginUser);
  }
}

export default new LoginUserController();
