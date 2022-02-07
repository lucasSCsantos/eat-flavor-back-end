import loginValidations from '../validations/loginValidations';
import validateRegister from '../validations/validateRegister';
import Users, { RegisterType } from '../models/Users';
import crypto from 'crypto';

export type LoginType = {
	email: string, 
	password: string
}

const login = ({ email, password }: LoginType) => {
	const isValid = loginValidations(email, password);
	return isValid;
};

const create = async ({ name, email, password }: RegisterType) => {
  const validation = await validateRegister({ name, email, password });
  
  if (validation) return validation;

  const hash = crypto.createHash('md5').update(password).digest('hex');

  const newUser = {
    name,
		email,
    password: hash,
  };

  const user = await Users.create(newUser);

  return { status: 201, user };
};

export default { login, create };
