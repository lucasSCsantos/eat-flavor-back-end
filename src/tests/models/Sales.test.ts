import Sales from "../../models/Sales";
import { expect } from "chai";
import { Callback, MongoClient, MongoClientOptions, ObjectId } from "mongodb";
import Sinon, { createSandbox } from "sinon";
import getConnectionMock from "../mocks/getConnectionMock";

const sandbox = createSandbox();

const IMAGE_URL = `https://images.unsplash.com/
photo-1541832676-9b763b0239ab?ixlib=rb-1.2.1&ix
id=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
&auto=format&fit=crop&w=1020&q=80`;

const saleProducts = [
	{
		name: 'Arroz de pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food',
		type: 'Carne Branca',
	},
	{
		name: 'Arroz',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
	{
		name: 'Pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
]

const sale = (status = 'pending') => ({
  user_id: '123456123456',
  address: 'Rua maluca',
  total_price: 30.0,
  sale_date: new Date(),
  status,
  products: saleProducts,
});

const saleList = [
  sale('pending'),
  sale('preparing'),
  sale('sent'),
]

describe('Testa o registro de vendas', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('sales').drop();
    sandbox.restore();
  });
 
  describe('quando é registrado com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Sales.create(sale());

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" da nova venda inserido', async () => {
      const response = await Sales.create(sale());

      expect(response).to.have.a.property('_id');
    });

    it('deve existir uma venda cadastrada!', async () => {
      const { _id } = await Sales.create(sale());
      const saleCreated = await connectionMock
        .db('EatFlavor')
        .collection('sales')
        .findOne(_id);
      expect(saleCreated).to.be.not.null;
    });
  });
});

describe('Testa se retorna um produto pelo id', () => {
  let id: string;
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
    const { _id } = await Sales.create(sale());
		id = _id.toString();
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('sales').drop();
    sandbox.restore();
  });

 
  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await Sales.getById(id);
      expect(response).to.be.a('object')
    });
    
    it('o objeto contem a propriedade id', async () => {
      const response = await Sales.getById(id);
      expect(response).to.have.property('_id')
    });

    it('o produto deve existir no banco de dados', async () => {
      const sale = await connectionMock
        .db('EatFlavor')
        .collection('sales')
        .findOne(new ObjectId(id));
      expect(sale).to.be.not.null;
    });

    it('se não existir retorna null', async () => {
      const sale = await connectionMock
        .db('EatFlavor')
        .collection('sales')
        .findOne(new ObjectId('123456123456'));
      expect(sale).to.be.null;
    });
  });
});

describe('Testa se lista todos os produtos', () => {
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
		for (let i in saleList) {
			await Sales.create(saleList[i]);
		}
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('sales').drop();
    sandbox.restore();
  });

	it('retorna um array', async () => {
		const response = await Sales.getAll();
		expect(response).to.be.a('object').that.have.property('sales')
	});
	
	it('o tamanho dessa array é igual a quantidade de produtos criados', async () => {
		const { sales } = await Sales.getAll();
		expect(sales).to.have.lengthOf(saleList.length);
	});

	it('o produto deve existir no banco de dados', async () => {
		const sale = connectionMock
			.db('EatFlavor')
			.collection('sales')
			.find();
		expect(sale).to.be.not.null;
	});
});

describe('Testa se atualiza um produto', () => {
  let id: ObjectId;
  let connectionMock: MongoClient;
  let mockedFunction: Sinon.SinonStub<[url: string, options: MongoClientOptions, callback: Callback<MongoClient>], void>;
  

  before(async () => {
    connectionMock = await getConnectionMock.getConnection();
    mockedFunction = sandbox.stub(MongoClient, 'connect');
    mockedFunction.resolves(connectionMock);
		for (let i in saleList) {
			await Sales.create(saleList[i]);
		}
  })

  after(async () => {
    await connectionMock.db('EatFlavor').collection('sales').drop();
    sandbox.restore();
  });

	it('retorna um array', async () => {
		const response = await Sales.getAll();
		expect(response).to.be.a('object').that.have.property('sales')
	});
	
	it('o tamanho dessa array é igual a quantidade de produtos criados', async () => {
		const { sales } = await Sales.getAll();
		expect(sales).to.have.lengthOf(saleList.length);
	});

	it('o produto deve existir no banco de dados', async () => {
		const sale = connectionMock
			.db('EatFlavor')
			.collection('sales')
			.find();
		expect(sale).to.be.not.null;
	});
});