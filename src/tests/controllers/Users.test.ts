// import { expect } from "chai";
// import Sinon, { createSandbox } from "sinon";
// import UsersModel from '../../models/Users';
// import UsersService from '../../services/Users';

// const sandbox = createSandbox();

// describe('Insere um novo usuário no DB', () => {
//   describe('quando os dados informados são inválidos', () => {
// 		it('retorna a mensagem correta se são vazios', async () => {
// 			const payload = {};
//       const response = await UsersService.login(payload);
//       expect(response.message).to.be.equal('Email and password are required')
//     });

// 		it('retorna a mensagem correta se o email for inválido', async () => {
// 			const payload = { email: 'cristovam10@gmail', password: '123456'};
// 			const response = await UsersService.login(payload);
// 			expect(response.message).to.be.equal('Email is not valid')
// 		});

//     it('retorna a mensagem correta se a senha for menor que 6', async () => {
// 			const payload = { email: 'lucicreide@gmail.com', password: '1234'};
//       const response = await UsersService.login(payload);
//       expect(response.message).to.be.equal('Password must be at least 6 characters long')
//     });
		
// 		it('retorna a mensagem correta se o usuário não existir', async () => {
// 			const payload = { email: 'lucicreide@gmail.com', password: '123456'};
// 			const response = await UsersService.login(payload);
// 			expect(response.message).to.be.equal('User not found')
// 		});

// 		it('retorna a mensagem correta se a senha for incorreta', async () => {
// 			const payload = { email: 'luc.cristovam10@gmail.com', password: '1234567'};
//       const response = await UsersService.login(payload);
// 			expect(response.message).to.be.equal('Invalid password')
//     });
//   });

//   describe('quando é inserido com sucesso', () => {
//     const payload = {
//       email: 'luc.cristovam10@gmail.com',
//       password: '123456',
//     };

//     before(() => {
//       const email = 'luc.cristovam10@gmail.com';
// 			sandbox.stub(UsersModel, 'getByEmail')
// 				.resolves({ email, password: '25d55ad283aa400af464c76d713c07ad' });
//     });

//     after(() => {
// 			sandbox.restore();
//     });

//     it('retorna um objeto', async () => {
//       const response = await UsersService.login(payload);

//       expect(response).to.be.a('object');
//     });

//     it('retorna user dentro do objeto e o status 200', async () => {
//       const response = await UsersService.create(payload);

// 			expect(response.user).to.be.equal('Invalid password')
//     });
//   });
// });