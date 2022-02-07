import Products from '../services/Products';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const products = await Products.getAll();
  res.status(200).json(products);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { product, status, message }: any = await Products.getById(id);

  if (!product) return res.status(status).json(message)

  res.status(status).json(product);
};

const create = async (req: Request, res: Response) => {
  const { name, description, price, type, category, url_image } = req.body;
  const { status: statusCode, message, product }: any = await Products.create({ name, description, price, type, category, url_image });

  if (!product) return res.status(statusCode).json(message)

  return res.status(statusCode).json(product);
}

export default {
	getAll,
	getById,
	create
}
