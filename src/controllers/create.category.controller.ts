import CreateCategoryService from '../services/create.category.service';
import { Router } from 'express';

class CreateTypeController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('', CreateCategoryService.createCategory);
  }
}

export default new CreateTypeController();
