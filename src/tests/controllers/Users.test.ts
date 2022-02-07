import chai, { expect } from "chai";
import { Request, Response } from "express";
import { createSandbox } from "sinon";
import sinonChai from 'sinon-chai';

chai.use(sinonChai)

const sandbox = createSandbox();

const UserService = require('../../services/Users');
const UserController = require('../../controllers/Users');

describe('Ao chamar o controller de login', () => {
	describe('quando os dados informados são inválidos', () => {
		let response: Response;
    let request: Request;

    before(() => {
      response.status = sandbox.stub()
        .returns(response);
      response.json = sandbox.stub()
        .returns(response);

  
      sandbox.stub(UserService, 'login')
        .resolves(false);
 		});

    after(() => {
      UserService.login.restore();
    });
		
		it('retorna a mensagem e o status correto se são vazios', async () => {
			request.body = {
				email: '',
				password: '',
			};
      await UserController.create(request, response);
			expect(response.status).to.have.been.calledWith(400);
			expect(response.json).to.have.been.calledWith({ message: 'Email and password are required' });
    });

		it('retorna a mensagem e o status correto se o email for inválido', async () => {
			request.body = {
				email: 'cristovam@gmail',
				password: '123456',
			};
      await UserController.create(request, response);
			expect(response.status).to.have.been.calledWith(400);
			expect(response.json).to.have.been.calledWith({ message: 'Invalid Email' });
		});

    it('retorna a mensagem e o status correto se a senha for menor que 6', async () => {
			request.body = {
				email: 'luc.cristovam@gmail.com',
				password: '12345',
			};
      await UserController.create(request, response);
			expect(response.status).to.have.been.calledWith(400);
			expect(response.json).to.have.been.calledWith({ message: 'Password must be at least 6 characters long' });
    });
		
		it('retorna a mensagem e o status correto se o usuário não existir', async () => {
			request.body = {
				email: 'lucicreide@gmail.com',
				password: '123456',
			};
      await UserController.create(request, response);
			expect(response.status).to.have.been.calledWith(400);
			expect(response.json).to.have.been.calledWith({ message: 'Password must be at least 6 characters long' });
		});
		it('retorna a mensagem e o status correto se a senha for incorreta', async () => {
			request.body = {
				email: 'lucicreide@gmail.com',
				password: '123456',
			};
      await UserController.create(request, response);
			expect(response.status).to.have.been.calledWith(400);
			expect(response.json).to.have.been.calledWith({ message: 'Invalid password' });
    });
  });
  describe('quando os dados são válidos', () => {
    let response: Response;
    let request: Request;

		const user = { email: 'luc.cristovam10@gmail.com', token: '12345678'}

    before(() => {
      response.status = sandbox.stub()
        .returns(response);
      response.json = sandbox.stub()
        .returns(response);
			sandbox.stub(jwtValidation, 'createToken')
				.returns('12345678');

  
      sandbox.stub(UserService, 'login')
        .resolves(false);
  	});

    after(() => {
			sandbox.restore();
    });

		it('é chamado o status com o código 201', async () => {
      await UserController.login(request, response);

      expect(response.status).to.have.been.calledWith(200);
    });

    it('é chamado o json com o usuário com o email e token', async () => {
      await UserController.login(request, response);

      expect(response.json).to.have.been.calledWith(user);
    });

  });
});