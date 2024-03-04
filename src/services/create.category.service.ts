import { Request, Response } from 'express';
import { db } from '../database/connection';
import { ICategory } from '../types/category';

class CreateCategoryService {
  public async createCategory(request: Request, response: Response) {
    try {
      const category: ICategory = request.body;


      const existingCategory = await db('category')
        .where('name', '=', category.name)
        .first();

      if (existingCategory) {
        return response.status(409).json({ message: 'Category already exists' });
      }
      const [categoryProduct] = await db('category')
        .insert({
          name: category.name,
        })
        .returning('id');
      return response.status(201).json({
        message: 'Category created successfully',
        name: categoryProduct,
        category: category.name,
      });
    } catch (error) {
      console.log(error);
      response.status(400).json({ message: 'Error creating category' });
    }
  }
}

export default new CreateCategoryService();