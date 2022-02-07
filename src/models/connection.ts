import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = 'EatFlavor';
const MONGO_DB_URL = `${process.env.MONGO_URL}`;

const connection = async () => {

	const client = await MongoClient.connect(MONGO_DB_URL)
		.then((r) => r)
		.catch((err) => err);
	const db: Db = client.db(DB_NAME);

	return db;
}

export default {
	connection,
}