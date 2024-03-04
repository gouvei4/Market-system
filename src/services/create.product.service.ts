import { Request, Response } from 'express';
import { db } from '../database/connection';
import { IProduct } from '../types/products';

class CreateProductsService {
  public async createProduct(request: Request, response: Response) {
    try {
      const product: IProduct = { ...request.body };
      const categoryId = request.params.categoryId;

      const category = await db('category')
        .where('id', '=', categoryId)
        .first();

      if (!category) {
        return response.status(404).json({ message: 'Category not found' });
      }

      const [productId] = await db('products').insert(product).returning('id');

      await db('category').insert({
        productId
      });

      response.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
      response.status(500).json({ message: 'Error creating product' });
    }
  }
}

export default new CreateProductsService();
