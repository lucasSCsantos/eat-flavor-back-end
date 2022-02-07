import { ObjectId } from "mongodb";
import statusTypes from "../utils/statusTypes";
import Sales, { SaleType } from "../models/Sales";

const getAll = async () => {
  const sales = await Sales.getAll();
  return sales;
};

const getById = async (id: string) => {
	if (!ObjectId.isValid(id) || !id) return { status: 400, message: "Invalid id" };

  const sale = await Sales.getById(id);

  return sale;
};

const create = async ({ user_id, address, total_price, sale_date, status, products }: SaleType) => {
  const sale = await Sales.create({ user_id, address, total_price, sale_date, status, products });
  return sale;
};

const update = async (id: string, status: string) => {
  if (!ObjectId.isValid(id) || !id) return { status: 400, message: "Invalid id" };
  if (!statusTypes.includes(status)) return { status: 400, message: "Invalid status"};
  const sale = await Sales.update(id, status);
  return sale;
};

export default {
	getAll,
	getById,
	create,
  update
}