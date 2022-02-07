import connection from "./connection";

export type RegisterType = {
	email: string,
	password: string,
	name: string
}

const getByEmail = async (email: string) => {
	const user = await connection.connection()
    .then((db) => db.collection('users').findOne({ email }));
	console.log(user)

	if (user) return { email, password: user.password };

  return null;
};

const create = async ({ email, password, name }: RegisterType) => {
	const user = await connection.connection()
		.then((db) => db.collection('users').insertOne({ email, password, name }));
	return { _id: user.insertedId, name, email };
}

export default {
  getByEmail,
	create,
};
