import { expect } from "chai";
import { ObjectId } from "mongodb";
import { createSandbox } from "sinon";
import imageUrl from "../../utils/imageUrl";
import ProductsModel, { DbProductType } from '../../models/Products';
import ProductsService from '../../services/Products';

const sandbox = createSandbox();

const product = {
  name: 'Arroz de pato',
	description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
	price: 10.99,
	url_image: imageUrl,
	category: 'food',
	type: 'Carne Branca',
}

const productsList = [
	{
		_id: new ObjectId('123456123456'),
		name: 'Arroz de pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food',
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456123457'),
		name: 'Arroz',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food',
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456189756'),
		name: 'Pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: imageUrl,
		category: 'food',
		type: 'Carne Branca',
	},
]

describe('Lista todos os produtos', () => {
	before(() => {
		sandbox.stub(ProductsModel, 'getAll')
			.resolves({ products: productsList });
	});

	after(() => {
		sandbox.restore();
	});
	
	it('retorna um objeto que contem o array de produtos', async () => {
		const response = await ProductsService.getAll();
		expect(response).to.have.property('products')
		expect(response.products).to.be.a('array')
	});

	it('esse array tem tamanho de 3', async () => {
		const response = await ProductsService.getAll();
		expect(response.products).to.have.lengthOf(3);
	});
});

describe('Lista um produto por Id', () => {

	before(() => {
		sandbox.stub(ProductsModel, 'getById')
			.resolves(productsList[0]);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando id é inválido', () => {
		it('retorna um objeto com mensagem se é vazio', async () => {
			const response = await ProductsService.getById('');
			expect(response).to.have.property('message');
		});

		it('retorna um objeto com mensagem se não é um ObjectId válido', async () => {
			const response = await ProductsService.getById('123');
			expect(response).to.have.property('message');
		});
	});

	describe('quando é listado com sucesso', () => {
		before(() => {
			sandbox.restore();
			sandbox.stub(ProductsModel, 'getById')
				.resolves(productsList[2]);
		});

		after(() => {
			sandbox.restore();
		});

		it('retorna um objeto', async () => {
			const response = await ProductsService.getById('123456189756');
			expect(response).to.be.a('object');
		});

		it('retorna o produto de mesmo id', async () => {
			const response = await ProductsService.getById('123456189756');
			expect(response.product).to.have.property('_id');
			const { _id } = response.product as DbProductType;
			expect(_id).to.be.equal(productsList[2]._id);
		});
	});
});

describe('Cria um produto', () => {

	before(() => {
		sandbox.stub(ProductsModel, 'create')
			.resolves(productsList[0]);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await ProductsService.create(product);
      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await ProductsService.create(product);
      expect(response.product).to.have.a.property('_id');
    });
  });
});