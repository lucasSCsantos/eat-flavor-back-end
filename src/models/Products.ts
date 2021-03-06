import { ObjectId } from "mongodb";
import connection from "./connection";

export type ProductType = {
	name: string,
	description: string,
	type: string,
	price: number,
	url_image: string,
	category: string
}

export type DbProductType = {
	_id: ObjectId,
	name: string,
	description: string,
	type: string,
	price: number,
	url_image: string,
	category: string
}

const getAll = async () => {
  const products = await connection.connection()
    .then((db) => db.collection('products').find().toArray());

  return { products } as { products: DbProductType[] };
};

const getById = async (id: string) => {
  const product = await connection.connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));

  if (!product) return null;

  return product;
};

const create = async ({ name, description, price, type, category, url_image }: ProductType) => {
	const product = await connection.connection()
		.then((db) => db.collection('products').insertOne({ name, description, price, type, category, url_image }));
	return { _id: product.insertedId, name, description, price, type, category, url_image  };
}

export default {
  getById,
	create,
	getAll,
};
