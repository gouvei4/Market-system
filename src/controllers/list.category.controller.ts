import CreateCategoryService from '../services/list.category.service';
import { Router } from 'express';

class ListCategoryController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get('', CreateCategoryService.listCategory);
  }
}

export default new ListCategoryController();
