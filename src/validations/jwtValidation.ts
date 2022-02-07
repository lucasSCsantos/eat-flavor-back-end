import jwt, { SignOptions } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
const pathToKey = path.join(__dirname, '../../jwt.evaluation.key');
const key = fs.readFileSync(pathToKey).toString().trim();

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d'
};

const createToken = (email: string) => {
  const token = jwt.sign({ email }, key, jwtConfig);
  return token;
};

export default {
  createToken,
};