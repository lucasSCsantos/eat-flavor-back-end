import jwt, { SignOptions } from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
const pathToKey = path.join(__dirname, '../../jwt.evaluation.key');
const key = fs.readFileSync(pathToKey).toString().trim();

const jwtConfig: SignOptions = {
  algorithm: 'HS256',
};

const createToken = (email: string) => {
  const token = jwt.sign({ email }, key, jwtConfig);
  return token;
};

// const validateToken = async (req, res, _next) => {
//   const { token } = req.body;
//   if (!token) return res.status(200).json({ tokenIsValid: false });

//   try {
//     const decodedJWT = jwt.verify(token, key);
//     if (decodedJWT) return res.status(200).json({ tokenIsValid: true });
//   } catch (_err) {
//     return res.status(200).json({ tokenIsValid: false });
//   }
// };

export default {
  createToken,
};