import { Request, Response } from 'express';
import Users from '../services/Users';
import UsersModels from '../models/Users';
import jwtValidation from '../validations/jwtValidation';
import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';

const pathToKey = path.join(__dirname, '../../jwt.evaluation.key');
const key = fs.readFileSync(pathToKey).toString().trim();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = jwtValidation.createToken(email);
  const { message, status, user }: any = await Users.login({ email, password });

	if (message) return res.status(status).json({ message });

  user.token = token;

  return res.status(status).json(user);
};

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const token = jwtValidation.createToken(email);
  const { status, message, user }: any = await Users.create({ email, password, name });

  if (!user) return res.status(status).json({ message });

  delete user.id;
  delete user.password;

  user.token = token;

  res.status(status).json(user);
};

const validateUser = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(402).json({ validUser: false });

  try {
    const decoded = jwt.verify(token, key);
		const { email } = decoded as { email: string }
    const user = await UsersModels.getByEmail(email);

    if (!user) {
      return res.status(401).json({ validUser: false });
    }

    return res.status(200).json({ validUser: true });
  } catch (_err) {
    return res.status(500).json({ validateUser: false });
  }
}

export default {
  login,
  register,
  validateUser
};
