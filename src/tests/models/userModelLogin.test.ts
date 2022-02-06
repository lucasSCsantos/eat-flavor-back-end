import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions } from "mongodb";
import Sinon from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

describe('Testa o endpoint POST `login`', () => {
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

    it('a senha do usuário foi salva em hash md5', async () => {
      const response = await Users.getByEmail(email);
      expect(response.password).to.be.match(/^[a-f0-9]{32}$/i)
    });
  });
});