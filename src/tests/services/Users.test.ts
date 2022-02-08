import { expect } from "chai";
import { ObjectId } from "mongodb";
import { createSandbox } from "sinon";
import UsersModel from '../../models/Users';
import UsersService from '../../services/Users';

const sandbox = createSandbox();
const email = 'luc.cristovam10@gmail.com';

describe('Loga com um usuário no DB', () => {

		before(() => {
			sandbox.stub(UsersModel, 'getByEmail')
				.resolves(null);
		});

		after(() => {
			sandbox.restore();
		});

  describe('quando os dados informados são inválidos', () => {
		it('retorna um objeto com mensagem se são vazios', async () => {
			const payload = {
				email: '',
				password: '',
			};
      const response = await UsersService.login(payload);
      expect(response).to.have.property('message')
    });

		it('retorna um objeto com mensagem se o email for inválido', async () => {
			const payload = { email: 'cristovam10@gmail', password: '123456'};
			const response = await UsersService.login(payload);
			expect(response).to.have.property('message')
		});

    it('retorna um objeto com mensagem se a senha for menor que 6', async () => {
			const payload = { email: 'lucicreide@gmail.com', password: '1234'};
      const response = await UsersService.login(payload);
      expect(response).to.have.property('message')
    });
		
		it('retorna um objeto com mensagem se o usuário não existir', async () => {
			const payload = { email: 'lucicreide@gmail.com', password: '123456'};
			const response = await UsersService.login(payload);
			expect(response).to.have.property('message')
		});

		it('retorna um objeto com mensagem se a senha for incorreta', async () => {
			sandbox.restore();
			sandbox.stub(UsersModel, 'getByEmail')
				.resolves({ email, password: '25d55ad283aa400af464c76d713c07ad', _id: new ObjectId('123456123456'), });
			const payload = { email: 'luc.cristovam10@gmail.com', password: '1234567'};
      const response = await UsersService.login(payload);
			expect(response).to.have.property('message')
			sandbox.restore();
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payload = {
      email: 'luc.cristovam10@gmail.com',
      password: '987654',
    };

    before(() => {
      const email = 'luc.cristovam10@gmail.com';
			sandbox.stub(UsersModel, 'getByEmail')
				.resolves({ email, password: '6c44e5cd17f0019c64b042e4a745412a', _id: new ObjectId('123456123456'), });
    });

    after(() => {
			sandbox.restore();
    });

    it('retorna um objeto', async () => {
      const response = await UsersService.login(payload);
      expect(response).to.be.a('object');
    });

    it('retorna user dentro do objeto', async () => {
      const response = await UsersService.login(payload);
			expect(response).to.have.property('user')
    });

  });
});

describe('Insere um novo usuário no DB', () => {

	before(() => {
		sandbox.stub(UsersModel, 'getByEmail')
			.resolves(null);
	});

	after(() => {
		sandbox.restore();
	});

	describe('quando os dados informados são inválidos', () => {
		it('retorna um objeto com mensagem se são vazios', async () => {
			const payload = {
				email: '',
				password: '',
				name: '',
			};
			const response = await UsersService.create(payload);
			expect(response).to.have.property('message')
		});

		it('retorna um objeto com mensagem se o nome for inválido', async () => {
			const payload = { 
				email: 'luc.cristovam10@gmail.com', 
				password: '123456', 
				name: 'Lu'
			};
			const response = await UsersService.create(payload);
			expect(response).to.have.property('message')
		});

		it('retorna um objeto com mensagem se o email for inválido', async () => {
			const payload = { 
				email: 'cristovam10@gmail', 
				password: '123456', 
				name: 'Lucas'
			};
			const response = await UsersService.create(payload);
			expect(response).to.have.property('message')
		});

		it('retorna um objeto com mensagem se a senha for menor que 6', async () => {
			const payload = { 
				email: 'lucicreide@gmail.com',
				password: '1234',
				name: 'Lucas'
			};
			const response = await UsersService.create(payload);
			expect(response).to.have.property('message')
		});
	});

	describe('quando é inserido com sucesso', () => {
		const payload = {
			email: 'luc.cristovam10@gmail.com',
			password: '987654',
			name: 'Lucas'
		};

		before(() => {
			const email = 'luc.cristovam10@gmail.com';
			sandbox.stub(UsersModel, 'create')
				.resolves({ email, name: 'Lucas', _id: new ObjectId('123456123456') });
		});

		after(() => {
			sandbox.restore();
		});

		it('retorna um objeto', async () => {
			const response = await UsersService.create(payload);
			expect(response).to.be.a('object');
		});

		it('retorna o novo user dentro do objeto', async () => {
			const response = await UsersService.create(payload);
			expect(response).to.have.property('user')
		});
	});
});