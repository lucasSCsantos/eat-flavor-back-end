import express from 'express';
import Products from './controllers/Products';
import Users from './controllers/Users';
import Sales from './controllers/Sales';
import validateJWT from './middlewares/validateJWT';
import validateAdmin from './middlewares/validateAdmin';

const router = express.Router();

router.get('/sales', validateJWT, Sales.getAll);
router.get('/sales/:id', validateJWT, Sales.getById);
router.put('/sales/:id', validateJWT, Sales.update);
router.post('/sales/', validateJWT, Sales.create);

router.get('/products', validateJWT, Products.getAll);
router.get('/products/:id', validateJWT, Products.getById);
router.post('/products', validateAdmin, Products.create);

router.post('/login', Users.login);
router.post('/register', Users.register);

export default router;
