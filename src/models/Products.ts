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

const getAll = async () => {
  const products = await connection.connection()
    .then((db) => db.collection('products').find().toArray());
  return { products };
};

const getById = async (id: string) => {
	if (!ObjectId.isValid(id)) {
    return false;
}

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
