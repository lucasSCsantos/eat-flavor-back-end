import { expect } from "chai";
import { ObjectId } from "mongodb";
import { createSandbox } from "sinon";
import imageUrl from "../../utils/imageUrl";
import SalesModel from '../../models/Sales';
import SalesService from '../../services/Sales';

const sandbox = createSandbox();

const saleProducts = [
	{
		_id: new ObjectId('123456123458'),
		name: 'Arroz de pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food',
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456123459'),
		name: 'Arroz',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456123456'),
		name: 'Pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
]

const sale = (status = 'pending') => ({
	_id: new ObjectId('123456123957'),
  user_id: '123456123457',
  address: 'Rua maluca',
  total_price: 30.0,
  sale_date: new Date(),
  status,
  products: saleProducts,
});

const updatedSale = {
	_id: new ObjectId('123456123957'),
  status: 'sent',
}

const saleList = [
  sale('pending'),
  sale('preparing'),
  sale('sent'),
]

describe('Lista todas as vendas', () => {
	before(() => {
		sandbox.stub(SalesModel, 'getAll')
			.resolves({ sales: saleList });
	});

	after(() => {
		sandbox.restore();
	});
	
	it('retorna um objeto que contem a array de vendas', async () => {
		const response = await SalesService.getAll();
		expect(response).to.have.property('sales')
		expect(response.sales).to.be.a('array')
	});

	it('esse array tem tamanho de 3', async () => {
		const response = await SalesService.getAll();
		expect(response.sales).to.have.lengthOf(3);
	});
});

describe('Lista uma venda por Id', () => {

	before(() => {
		sandbox.stub(SalesModel, 'getById')
			.resolves(saleList[0]);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando id é inválido', () => {
		it('retorna um objeto com mensagem se é vazio', async () => {
			const response = await SalesService.getById('');
			expect(response).to.have.property('message');
		});

		it('retorna um objeto com mensagem se não é um ObjectId válido', async () => {
			const response = await SalesService.getById('123');
			expect(response).to.have.property('message');
		});
	});

	describe('quando é listado com sucesso', () => {
		before(() => {
			sandbox.restore();
			sandbox.stub(SalesModel, 'getById')
				.resolves(saleList[2]);
		});

		after(() => {
			sandbox.restore();
		});

		it('retorna um objeto', async () => {
			const response = await SalesService.getById('123456189756');
			expect(response).to.be.a('object');
		});

		it('retorna a venda de mesmo id', async () => {
			const response = await SalesService.getById('123456189756');
			expect(response.sale).to.have.property('_id');
			const { _id } = response.sale as { _id: ObjectId };
			expect(_id).to.be.equal(saleList[2]._id);
		});
	});
});

describe('Cria uma venda', () => {

	before(() => {
		sandbox.stub(SalesModel, 'create')
			.resolves(saleList[0]);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await SalesService.create(sale());
      expect(response).to.be.a('object');
    });

    it('tal objeto possui a "id" do novo venda inserido', async () => {
      const response = await SalesService.create(sale());
      expect(response.sale).to.have.a.property('_id');
    });
  });
});

describe('Atualiza o status de uma venda', () => {

	before(() => {
		sandbox.stub(SalesModel, 'update')
			.resolves(updatedSale);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando os dados são inválidos', () => {
    it('retorna um objeto com mensagem se status for inválido', async () => {
      const response = await SalesService.update('123456123957', 'invalid');
      expect(response).to.have.property('message');
    });

    it('retorna um objeto com mensagem se o id não existir ou for inválido', async () => {
      const response = await SalesService.update('', 'sent');
      expect(response).to.have.property('message');
    });
  });

	describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await SalesService.update('123456123957', 'sent');
			expect(response).to.be.a('object');
    });

    it('tal objeto possui o mesmo id inserido', async () => {
			const response = await SalesService.update('123456123957', 'sent');
      expect(response.sale).to.have.a.property('_id');
			const { _id } = response.sale as { _id: ObjectId };
			console.log(_id.toString() === '123456123957')
			expect(_id).to.be.equal(updatedSale._id);
    });

		it('o status mudou de fato', async () => {
			const response = await SalesService.update('123456123957', 'sent');
      expect(response).to.have.a.property('status');
			const { status } = response.sale as { status: string };
			expect(status).to.be.not.equal(sale().status);
    });
  });
});