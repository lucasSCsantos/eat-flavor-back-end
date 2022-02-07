import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import Users from '@models/Users';
import { NextFunction, Response } from 'express';

const pathToKey = path.join(__dirname, '../../jwt.evaluation.key');
const key = fs.readFileSync(pathToKey).toString().trim();

export default async (req: { [key: string]: any } , res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, key);
		const { email } = decoded as { email: string }
    const user = await Users.getByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User dont exists' });
    }

    req.data = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};