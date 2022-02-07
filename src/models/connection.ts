import { Db, MongoClient } from 'mongodb';

const DB_NAME = 'EatFlavor';
const MONGO_DB_URL = `mongodb://127.0.0.1:27017/EatFlavor`;

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