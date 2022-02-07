import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions } from "mongodb";
import Sinon, { createSandbox } from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

const sandbox = createSandbox();

describe('Testa o endpoint POST `register`', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

	const register = {
		email: 'luc.cristovam10@gmail.com',
		name: 'Lucas Santos',
		password: '25d55ad283aa400af464c76d713c07ad',
		role: 'client'
	}

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('users').drop();
    sandbox.restore();
  });
 
  describe('Quando é registrado com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Users.create(register);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await Users.create(register);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um filme com o título cadastrado!', async () => {
      await Users.create(register);
      const userCreated = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ email: register.email });
      expect(userCreated).to.be.not.null;
    });
  });
});