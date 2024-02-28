import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { db } from '../database/connection';
import { IUser } from '../types/user';
import jwt from 'jsonwebtoken';

class LoginUserService {
  public async loginUser(request: Request, response: Response) {
    const { email, password } = request.body as IUser;
    try {
      const user = await db('users as u')
        .select('u.id', 'u.name', 'u.email', 'u.phone', 'u.password')
        .where('email', email)
        .where('active', true)
        .first();

      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const token = jwt.sign(
            { id: user.id },
            process?.env?.SECRET_JWT || '',
            {
              expiresIn: '24h',
            },
          );
  
          response.json({ ...user, auth: true, token });
        } else {
          response.status(401).json({ message: 'Invalid login' });
        }
      } else {
        response.status(401).json({ message: 'Invalid login' });
      }
    } catch (error) {
      response.status(400).json({ message: 'Error during login', error });
    }
  }
}

export default new LoginUserService();
