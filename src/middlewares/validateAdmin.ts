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
		const { data } = decoded as { data: { email: string } }
    
    if (data.email !== 'admin@admin.com') {
      return res
        .status(401)
        .json({ message: 'Permission denied' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};