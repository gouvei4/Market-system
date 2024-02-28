import { db } from '../database/connection';
import { IUser } from '../types/user';
import { encrypt } from '../utils/crypt';
import { Request, Response } from 'express';

class CreateUserService {
  public async createUser(request: Request, response: Response) {
    const user: IUser = request.body;
    try {
      await db('users')
        .insert({
          name: user.name,
          email: user.email,
          active: user.active,
          phone: user.phone,
          password: await encrypt('sha1', user.password),
        })
        .returning('id')
        .then((data) =>
          response.json({
            message: 'User created successfully!',
            id: data[0].id,
          }),
        )
        .catch((error) => {
          if (error.code == 23505) {
            response.status(400).json({ message: 'User already exists', error });
          } else {
            response
              .status(400)
              .json({ message: 'Error creating user', error });
          }
        });
    } catch (error) {
      response.status(400).json({ message: 'Error creating user', error });
    }
  }
}

export default new CreateUserService();