import { expect } from "chai";
import { ObjectId } from "mongodb";
import { createSandbox } from "sinon";
import ProductsModel from '../../models/Products';
import ProductsService from '../../services/Products';

const sandbox = createSandbox();

const IMAGE_URL = `https://images.unsplash.com/
photo-1541832676-9b763b0239ab?ixlib=rb-1.2.1&ix
id=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8
&auto=format&fit=crop&w=1020&q=80`;

const productsList = [
	{
		_id: new ObjectId('123456123456'),
		name: 'Arroz de pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food',
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456123457'),
		name: 'Arroz',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food', //food, drink, dessert
		type: 'Carne Branca',
	},
	{
		_id: new ObjectId('123456189756'),
		name: 'Pato',
		description: 'Um arroz sequinho, delicioso, recheado com pato e farinheira',
		price: 10.99,
		url_image: IMAGE_URL,
		category: 'food', //food, drink, dessert
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
		it('retorna null se é vazio', async () => {
			const response = await ProductsService.getById();
			expect(response).to.be.null
		});

		it('retorna null se não é um ObjectId válido', async () => {
			const response = await ProductsService.getById('123');
			expect(response).to.be.null
		});
	});

	describe('quando é listado com sucesso', () => {
		before(() => {
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
			expect(response).to.have.property('_id');
			expect(response._id).to.be.equal(productsList[2]._id);
		});
	});
});