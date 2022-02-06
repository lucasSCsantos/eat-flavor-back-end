import { Db, MongoClient } from 'mongodb';
import * as dotenv from "dotenv";

const LOCAL = 'mongodb';
const DB_NAME = 'EatFlavor';
const MONGO_DB_URL = `mongodb://${process.env.HOST || LOCAL}:27017/EatFlavor`;

const connection = async () => {
	dotenv.config();
					
	const client = await MongoClient.connect(MONGO_DB_URL, { directConnection: true });
			
	const db: Db = client.db(DB_NAME);

	return db;
}

export default {
	connection,
}