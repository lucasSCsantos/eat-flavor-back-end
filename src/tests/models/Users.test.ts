import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions } from "mongodb";
import Sinon, { createSandbox } from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

const sandbox = createSandbox();

const register = {
  email: 'luc.cristovam10@gmail.com',
  name: 'Lucas Santos',
  password: '25d55ad283aa400af464c76d713c07ad',
  role: 'client'
}

describe('Testa o registro de usuários', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('users').drop();
    sandbox.restore();
  });
 
  describe('quando é registrado com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Users.create(register);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo usuário inserido', async () => {
      const response = await Users.create(register);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um usuário cadastrado!', async () => {
      await Users.create(register);
      const userCreated = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ email: register.email });
      expect(userCreated).to.be.not.null;
    });
  });
});

describe('Testa se retorna um usuário para login', () => {
  const { email } = register;
  
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

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

 
  describe('quando é inserido com sucesso', () => {
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

    it('quando não existir retorna null', async () => {
      const user = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ email: 'lucicreide@gmail.com' });
      expect(user).to.be.null;
    });
  });
});