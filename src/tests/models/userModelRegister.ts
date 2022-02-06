import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions } from "mongodb";
import Sinon from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

describe('Testa o endpoint POST `register`', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

  const email = 'luc.cristovam10@gmail.com';
  
  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = Sinon.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('movies').drop();
    mockedFunction.restore();
  });
 
  describe('Quando é inserido com sucesso', () => {
    it('o usuário deve existir no banco de dados', async () => {
      const response = await Users.getByEmail(email);
      expect(response).to.be.not.null;
    });

    it('retorna um objeto', async () => {
      const response = await Users.getByEmail(email);
      expect(response).to.be.a('object')
    });
    
    it('o usuário tem uma senha registrada', async () => {
      const response = await Users.getByEmail(email);
      expect(response).to.have.property('password')
    });

    it('deve existir um usuário com o email cadastrado!', async () => {
      await User.create(register);
      const userCreated = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ email: register.email });
      expect(userCreated).to.be.not.null;
    });
  });
});