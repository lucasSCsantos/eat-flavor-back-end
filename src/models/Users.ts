import connection from "./connection";

const getByEmail = async (email: string) => {
	const user = await connection.connection()
    .then((db) => db.collection('users').findOne({ where: { email }}));

	if (user) return { email, password: user.password };

  return null;
};

export default {
  getByEmail,
};
