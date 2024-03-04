import { Request, Response } from 'express';
import { db } from '../database/connection';

class ListUsersService {
  public async listService(request: Request, response: Response) {
    const { id, email } = request.query;
    try {
      
      const usersSql = db('users').select(
        'id',
        'name',
        'email',
        'active',
        'phone',
        'user_type_id',
      );
      id ? usersSql.where({ id }) : null;
      email ? usersSql.where({ email }) : null;
      usersSql.then((data) => response.json(data));
      usersSql.catch((error) =>
        response
          .status(400)
          .json({ message: 'Error when searching for users', error }),
      );
    } catch (error) {
      response
        .status(400)
        .json({ message: 'Error when searching for users', error });
    }
  }
}

export default new ListUsersService();
