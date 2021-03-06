import connection from "./connection";

export type RegisterType = {
	email: string,
	password: string,
	name: string
}

const getByEmail = async (email: string) => {
	const user = await connection.connection()
    .then((db) => db.collection('users').findOne({ email }));

	if (user) return { email, password: user.password, _id: user._id };

  return null;
};

const create = async ({ email, password, name }: RegisterType) => {
	const user = await connection.connection()
		.then((db) => db.collection('users').insertOne({ email, password, name, role: 'client' }));
	return { _id: user.insertedId, name, email };
}

export default {
  getByEmail,
	create,
};
