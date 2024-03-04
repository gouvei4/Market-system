import { db } from '../database/connection';
import { IUser } from '../types/user';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createValidationSchemaUser } from '../utils/validations';
import { ValidationError } from 'yup';

class CreateUserService {
  public async createUser(request: Request, response: Response) {
    const user: IUser = request.body;
    const password = user.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      try {
        await createValidationSchemaUser.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        return response
          .status(error instanceof ValidationError ? 500 : 500)
          .json({
            error: 'Validation error',
            details:
              error instanceof ValidationError ? error.errors : undefined,
          });
      }

      const existingUser = await db('users')
        .where('email', '=', user.email)
        .first();

      if (existingUser) {
        return response.status(409).json({ message: 'User already exists' });
      }

      const [userId] = await db('users').insert({
        name: user.name,
        email: user.email,
        active: user.active,
        phone: user.phone,
        password: hashedPassword,
      }).returning('id');

      return response.status(201).json({
        message: 'User created successfully!',
        user: {
          id: userId,
          name: user.name,
          email: user.email,
          active: user.active,
          phone: user.phone,
        },
      });
    } catch (error) {
      response.status(400).json({ message: 'Error creating user', error });
    }
  }
}

export default new CreateUserService();
