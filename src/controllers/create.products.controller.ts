import CreateProductsService from '../services/create.product.service';
import { Router } from 'express';

class CreateProductController {
  router = Router();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/:categoryId', CreateProductsService.createProduct);
  }
}

export default new CreateProductController();
