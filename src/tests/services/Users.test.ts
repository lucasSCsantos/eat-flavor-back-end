import { expect } from "chai";
import { createSandbox } from "sinon";
import UsersModel from '../../models/Users';
import UsersService from '../../services/Users';

const sandbox = createSandbox();
const email = 'luc.cristovam10@gmail.com';

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
				.resolves({ email, password: '25d55ad283aa400af464c76d713c07ad' });
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
				.resolves({ email, password: '6c44e5cd17f0019c64b042e4a745412a' });
    });

    after(() => {
			sandbox.restore();
    });

    it('retorna um objeto', async () => {
      const response = await UsersService.login(payload);
      expect(response).to.be.a('object');
    });

    it('retorna user dentro do objeto e o status 200', async () => {
      const response = await UsersService.login(payload);
			expect(response).to.have.property('user')
    });

  });
});