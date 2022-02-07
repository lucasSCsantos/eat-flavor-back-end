import loginValidations from '../validations/loginValidations';

export type LoginType = {
	email: string, 
	password: string
}

const login = ({ email, password }: LoginType) => {
	const isValid = loginValidations(email, password);
	return isValid;
};

export default { login };
