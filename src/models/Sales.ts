import { ObjectId } from "mongodb";
import connection from "./connection";
import { ProductType } from "./Products";

export type SaleType = {
	user_id: string,
  address: string,
  total_price: number,
  sale_date: Date,
  status: string,
  products: ProductType[],
}

const getAll = async () => {
  const sales = await connection.connection()
    .then((db) => db.collection('sales').find().toArray());
  return { sales };
};

const getById = async (id: string) => {
	if (!ObjectId.isValid(id)) {
    return false;
}

  const sale = await connection.connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));

  if (!sale) return null;

  return sale;
};

const create = async ({ user_id, address, total_price, sale_date, status, products }: SaleType) => {
	const sale = await connection.connection()
		.then((db) => db.collection('sales').insertOne({ user_id, address, total_price, sale_date, status, products }));
	return { _id: sale.insertedId, user_id, address, total_price, sale_date, status, products  };
}

export default {
  getById,
	create,
	getAll
};
