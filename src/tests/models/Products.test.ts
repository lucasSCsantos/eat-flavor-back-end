import Users from "../../models/Users";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions, ObjectId } from "mongodb";
import Sinon, { createSandbox } from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

const sandbox = createSandbox();

const product = {
  name: 'Arroz de pato',
	description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
	price: 10.99,
	url_image: '',
	category: 'food', //food, drink, dessert
	type: 'Carne Branca',
}

const productsList = [
	{
		name: 'Arroz de pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: '',
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
	{
		name: 'Arroz',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: '',
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
	{
		name: 'Pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: '',
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	}
]

describe('Testa o registro de produtos', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('products').drop();
    sandbox.restore();
  });
 
  describe('quando é registrado com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Products.create(product);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await Products.create(product);

      expect(response).to.have.a.property('_id');
    });

    it('deve existir um produto cadastrado!', async () => {
      await Products.create(product);
      const productCreated = await connectionMock
        .db('EatFlavor')
        .collection('users')
        .findOne({ name: product.name });
      expect(productCreated).to.be.not.null;
    });
  });
});

describe('Testa se retorna um produto pelo id', () => {
  let id: ObjectId;
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
    const { _id } = await Products.create(product);
		id = _id;
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('products').drop();
    sandbox.restore();
  });

 
  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Products.getById(id);
      expect(response).to.be.a('object')
    });
    
    it('o objeto contem a propriedade id, igual a enviada', async () => {
      const response = await Products.getById(id);
      expect(response).to.have.property('id')
			expect(response._id).to.be.equal(id)
    });

    it('o produto deve existir no banco de dados', async () => {
      const product = await connectionMock
        .db('EatFlavor')
        .collection('products')
        .findOne(new ObjectId(id));
      expect(product).to.be.not.null;
    });

    it('quando não existir retorna null', async () => {
      const product = await connectionMock
        .db('EatFlavor')
        .collection('products')
        .findOne(new ObjectId(id));
      expect(product).to.be.null;
    });
  });
});

describe('Testa se lista todos os produtos', () => {
  let id: ObjectId;
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
		for (let i in productsList) {
			await Products.create(productsList[i]);
		}
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('products').drop();
    sandbox.restore();
  });

	it('retorna um array', async () => {
		const response = await Products.getAll();
		expect(response).to.be.a('array')
	});
	
	it('o tamanho dessa array é igual a quantidade de produtos criados', async () => {
		const response = await Products.getAll();
		expect(response).to.have.length(productsList.length);
	});

	it('o produto deve existir no banco de dados', async () => {
		const product = connectionMock
			.db('EatFlavor')
			.collection('products')
			.find();
		expect(product).to.be.not.null;
	});
});