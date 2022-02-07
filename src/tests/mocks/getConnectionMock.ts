import { MongoClient } from "mongodb";
import { MongoMemoryServer } from 'mongodb-memory-server';


const getConnection = async () => {
  const DBSERVER = await MongoMemoryServer.create();
  const URLMock = DBSERVER.getUri();
  console.log(URLMock);
  
  return await MongoClient.connect(`${URLMock}`);
};

export default { getConnection };