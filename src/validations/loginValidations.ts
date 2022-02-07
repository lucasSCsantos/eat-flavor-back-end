import emailRegex from '../utils/emailRegex';
import crypto from 'crypto';
import Users from '../models/Users';
import { LoginType } from '@services/Users';

const emailAndPasswordExists = ({ email, password }: LoginType) => {
  if (!email || !password) {
    return {
      status: 400,
      message: 'Email and password are required',
    };
  }
  return false;
};

const emailIsValid = (email: keyof LoginType | string) => {
  if (!emailRegex.test(email)) {
    return {
      status: 400,
      message: 'Email is not valid',
    };
  }
  return false;
};

const passwordIsSmallerThanSix = (password: keyof LoginType | string) => {
  if (password.length < 6) {
    return {
      status: 400,
      message: 'Password must be at least 6 characters long',
    };
  }
  return false;
};

const userExists = async ({ email, password }: LoginType) => {
  const user = await Users.getByEmail(email);
  if (!user) {
    return {
      status: 404,
      message: 'User not found',
    };
  }
  return false;
};

const validatePassword = async ({ email, password }: LoginType) => {
  const hash = crypto.createHash('md5').update(password).digest('hex');
  const user = await Users.getByEmail(email);
  if (user?.password !== hash) {
    return {
      status: 400,
      message: 'Invalid password',
    };
  }

  return {
    status: 200,
    user,
  };
  };

export default async (email: string, password: string) => {
  const a = emailAndPasswordExists({ email, password });
  const b = emailIsValid(email);
  const c = passwordIsSmallerThanSix(password);
  const d = await userExists({ email, password });
  const e = await validatePassword({ email, password });
  if (a) return a;
  if (b) return b;
  if (c) return c;
  if (d) return d;
  if (e) return e;
}
