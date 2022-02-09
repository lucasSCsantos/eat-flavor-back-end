import Users, { RegisterType } from "../models/Users";
import emailRegex from "../utils/emailRegex";

const checkEmail = async (email: string) => {
  if (!email || typeof email !== 'string') {
    return { status: 400, message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { status: 400, message: 'Email must be a valid email' };
  }
  
  const emailExists = await Users.getByEmail(email);
  if (emailExists) {
    return { status: 409, message: 'User already registered' };
  }
  return false;
};

const checkName = (name: string) => {
  if (!name || typeof name !== 'string' || name.length < 3) {
    return { status: 400, message: 'Name length must be at least 3 characters long' };
  }
  return false;
};

const checkPassword = (password: string) => {
  if (!password || typeof password !== 'string') {
    return { status: 400, message: 'Password is required' };
  }
  if (password.length < 6) {
    return { status: 400, message: 'Password length must be at least 6 characters long' };
  }
  return false;
};

export default async ({ name, email, password }: RegisterType) => {
  const a = checkName(name);
  const b = checkPassword(password);
  const c = await checkEmail(email);
  if (a) return a;
  if (b) return b;
  if (c) return c;
  return false;
};