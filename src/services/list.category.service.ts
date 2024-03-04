import { Request, Response } from 'express';
import { db } from '../database/connection';

class ListCategoryService {
  public async listCategory(request: Request, response: Response) {
    const category = request.body;
    try {
      const categorySql = db('category').select('name');
      category ? categorySql.where(category) : null;
      categorySql.then((data) =>
        response.json({
          message: 'Category found',
          data,
        }),
      );
      categorySql.catch((error) =>
        response.status(400).json({
          error: error,
          message: 'Error when searching category',
        }),
      );
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Error when searching for category', error });
    }
  }
}

export default new ListCategoryService();
