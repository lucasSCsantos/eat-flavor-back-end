import { ObjectId } from "mongodb";
import Products, { ProductType } from "../models/Products";

const getAll = async () => {
  const products = await Products.getAll();
  return products;
};

const getById = async (id: string) => {
	if (!ObjectId.isValid(id) || !id) return { status: 400, message: "Invalid id" };

  const product = await Products.getById(id);

  return { status: 200 , product };
};

const create = async ({ name, description, price, type, category, url_image }: ProductType) => {
  const product = await Products.create({ name, description, price, type, category, url_image });
  return { status: 201 , product };
};

export default {
	getAll,
	getById,
	create
}