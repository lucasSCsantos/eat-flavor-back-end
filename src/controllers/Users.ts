import { Request, Response } from 'express';
import Users from '../services/Users';
import jwtValidation from '../validations/jwtValidation';

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = jwtValidation.createToken(email);
  const { message, status, user }: any = await Users.login({ email, password });

	if (message) res.status(status).json({ message });

  delete user.password;

  user.token = token;

  return res.status(status).json(user);
};

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const token = jwtValidation.createToken(email);
  const { code, message, user }: any = await Users.create({ email, password, name });

  if (!user) return res.status(code).json({ message });

  delete user.id;
  delete user.password;

  user.token = token;

  res.status(code).json(user);
};

export default {
  login,
  register
};
