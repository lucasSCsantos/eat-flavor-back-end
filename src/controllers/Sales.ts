import Sales from '../services/Sales';
import { Request, Response } from 'express';
import { SaleType } from '../models/Sales';

const getAll = async (req: Request, res: Response) => {
  const sales = await Sales.getAll();
  res.status(200).json(sales);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { sale, status, message }: any = await Sales.getById(id);

  if (!sale) return res.status(status).json(message)

  res.status(status).json(sale);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status }= req.body;

  const { status: statusCode, message, sale }: any = await Sales.update(id, status);
  
  if (!sale) return res.status(statusCode).json(message)

  res.status(statusCode).json(sale);
};

const create = async (req: Request, res: Response) => {
  const { user_id, address, total_price, sale_date, status, products }: SaleType = req.body;
  const { status: statusCode, message, sale }: any = await Sales.create({ user_id, address, total_price, sale_date, status, products });

  if (!sale) return res.status(statusCode).json(message)

  return res.status(statusCode).json(sale);
}

export default {
	getAll,
	getById,
	create,
  update
}
