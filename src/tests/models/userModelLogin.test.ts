import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions } from "mongodb";
import Sinon, { createSandbox } from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";
const sandbox = createSandbox();

describe('Testa o endpoint POST `login`', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

  const email = 'luc.cristovam10@gmail.com';
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
    await Users.create(register);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('users').drop();
    sandbox.restore();
  });

 
  describe('Quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Users.getByEmail(email);
      expect(response).to.be.a('object')
    });
    
    it('o usuário tem uma senha registrada', async () => {
      const response = await Users.getByEmail(email);
      expect(response).to.have.property('password')
    });
    
    it('a senha do usuário foi salva em hash md5', async () => {
      const response = await Users.getByEmail(email);
      expect(response?.password).to.be.match(/^[a-f0-9]{32}$/i)
    });

    it('o usuário deve existir no banco de dados', async () => {
      const user = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ email });
      expect(user).to.be.not.null;
    });
  });
});