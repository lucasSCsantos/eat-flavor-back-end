import express from 'express';
import Products from './controllers/Products';
import Users from './controllers/Users';
import Sales from './controllers/Sales';
import jwtValidation from './validations/jwtValidation';

const router = express.Router();

router.get('/sales', Sales.getAll);
router.get('/sales/:id', Sales.getById);
router.put('/sales/:id', Sales.update);
router.post('/sales/', Sales.create);

router.get('/products', Products.getAll);
router.get('/products/:id', Products.getById);
router.get('/products', Products.create);

router.post('/login', Users.login);
router.post('/register', Users.register);

export default router;
