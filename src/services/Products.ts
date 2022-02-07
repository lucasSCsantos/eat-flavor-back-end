import { ObjectId } from "mongodb";
import Products from "../models/Products";

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const getById = async (id: string) => {
	if (!ObjectId.isValid(id)) return { status: 400, message: "Invalid id" };

  const product = await Products.getById(id);

  return product;
};

export default {
	getAll,
	getById
}