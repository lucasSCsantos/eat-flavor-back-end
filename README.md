<h1 align="center"
  <img alt="Logo" src="https://i.imgur.com/lY7ZWok.png" width="250px" /
</h1

<p align="center"
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasSCsantos/pokedexApp"
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasSCsantos/pokedexApp"
  <img alt="Stars" src="https://img.shields.io/github/stars/lucasSCsantos/pokedexApp"
  <img alt="Repository Size" src="https://img.shields.io/github/repo-size/lucasSCsantos/pokedexApp"
</p

<h3 align="center"
  A api está hospedada no Heroku e pode ser acessada através da url: 
	<br/
	"https://eatflavor-bd.herokuapp.com/"
</h3

## :page_with_curl: Sobre

Este repositório contém o back-end do site de delivery da EatFlavor. A api foi feita com [Node](https://nodejs.org/en/), ultilizando o framework [Express](https://expressjs.com/pt-br/) e banco de dados [MongoDb](https://www.mongodb.com/). 
São 3 tabelas do banco de dados para usuários, produtos e vendas. Há dois tipos de usuário, administrador e cliente, o cliente tem permissão para listar produtos, listar vendas e atualizar o status desta, enquanto o administrador também tem permissão para adicionar produtos. O sistema de autenticação foi desenvolvido com [JWT](https://jwt.io/) para aferir as permissões necessárias.
Foi utilizado o modelo de arquiterura MSC para a comunicação com o banco de dados, validações e comunicação com o usuário. Os models e os services foram feitos com TDD (Test Driven Development) utlizando [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) e [Sinon](https://sinonjs.org/) e testando cada camada individualmente.


## 🔧 Recursos

- Listar produtos
- Listar produto por id
- Criar produto
- Listar vendas
- Listar venda por id
- Criar venda
- Atualizar venda
- Registrar usuário
- Validar usuário
- Validar token

## :hammer: Tecnologias

Esse projeto foi desenvolvido com:

- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://reactnavigation.org/)
- [Node](https://kmagiera.github.io/react-native-gesture-handler/)
- [MongoDB](https://github.com/react-native-svg/react-native-svg)
- [JWT](https://redux.js.org/)

Testes

- [Mocha](https://styled-components.com/)
- [Chai](https://docs.expo.io/guides/icons/)
- [Sinon](https://eslint.org/)

# Instalação

```bash
  # Clone o repositório:
  $ https://github.com/lucasSCsantos/eat-flavor-back-end

  # Entre no diretório:
  $ cd eat-flavor-back-end
  
  # Instale as dependencias:
  $ yarn ou npm install
  
  # Inicie o app:
  $ yarn start ou npm start
```

# End Points

### Produtos
#### Listar todos os produtos:

```bash
https://eatflavor-bd.herokuapp.com/products
```
```json
{
	"products": [
		{
			"_id": "123456789123",
 			"name": "Serradura",
			"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
  		"price": 6.99,
			"url_image": "https://imagem.sobremesa/bonita.png",
			"category": "dessert",
			"type": "Fria"
		},
		...
	]
}
```
#### Acessar um produto pelo id:

```bash
https://eatflavor-bd.herokuapp.com/products/:id
```
```json
{
	"_id": "123456789123",
  "name": "Serradura",
	"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
  "price": 6.99,
	"url_image": "https://imagem.sobremesa/bonita.png",
	"category": "dessert",
	"type": "Fria"
}
```
#### Adicionar um produto:

```bash
https://eatflavor-bd.herokuapp.com/products
```
A estrutura para adicionar um produto deve ser essa:
```json
{
	"name": "Serradura",
	"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
	"price": 6.99,
	"url_image": "https://imagem.sobremesa/bonita.png",
	"category": "dessert",
	"type": "Fria"
},
```
O retorno deve ser:
```json
{
	"_id": "123456789123",
	"name": "Serradura",
	"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
	"price": 6.99,
	"url_image": "https://imagem.sobremesa/bonita.png",
	"category": "dessert",
	"type": "Fria"
},
### Produtos
#### Listar todas as vendas:

```bash
https://eatflavor-bd.herokuapp.com/sales
```
```json
{
	"sales": [
		{
			"_id": "123456789125",
			"user_id": "Arroz",
			"address": "Rua feia",
			"total_price": 20.99,
			"sale_date": "Mon Feb 07 2022 20:35:16 GMT-0300",
			"status": "pending",
			"products": [
				{
					"_id": "123456789123",
					"name": "Arroz",
					"description": "Um arroz sequinho, delicioso, recheado com pato e farinheira",
					"price": 10.99,
					"url_image": "https://imagem.arroz/pato.jpeg",
					"category": "food",
					"type": "Carne Branca"
				},
				...
			]
		},
		...
	]
}
```
#### Acessar um produto pelo id:

```bash
https://eatflavor-bd.herokuapp.com/sales/:id
```
```json
{
	"_id": "123456789123",
	"user_id": "Arroz",
	"address": "Rua feia",
	"total_price": 20.99,
	"sale_date": "Mon Feb 07 2022 20:35:16 GMT-0300",
	"status": "pending",
	"products": [
		{
			"name": "Arroz",
			"description": "Um arroz sequinho, delicioso, recheado com pato e farinheira",
			"price": 10.99,
			"url_image": "https://imagem.arroz/pato.jpeg",
			"category": "food",
			"type": "Carne Branca"
		},
		...
	]
},
```
#### Adicionar uma venda:

```bash
https://eatflavor-bd.herokuapp.com/sales
```
A estrutura para adicionar uma venda deve ser essa:
```json
{
	"user_id": "Arroz",
	"address": "Rua feia",
	"total_price": 20.99,
	"sale_date": "Mon Feb 07 2022 20:35:16 GMT-0300",
	"status": "pending",
	"products": [
		{
			"name": "Arroz",
			"description": "Um arroz sequinho, delicioso, recheado com pato e farinheira",
			"price": 10.99,
			"url_image": "https://imagem.arroz/pato.jpeg",
			"category": "food",
			"type": "Carne Branca"
		},
		...
	]
},
```
O retorno deve ser:
```json
{
	"_id": "123456789123",
	"user_id": "Arroz",
	"address": "Rua feia",
	"total_price": 20.99,
	"sale_date": "Mon Feb 07 2022 20:35:16 GMT-0300",
	"status": "pending",
	"products": [
		{
			"name": "Arroz",
			"description": "Um arroz sequinho, delicioso, recheado com pato e farinheira",
			"price": 10.99,
			"url_image": "https://imagem.arroz/pato.jpeg",
			"category": "food",
			"type": "Carne Branca"
		},
		...
	]
},
```
### Usuários
#### Registrar usuário:

```bash
https://eatflavor-bd.herokuapp.com/register
```
A estrutura para adicionar um usuário deve ser essa:
```json
{
	"name": "Ednaldo",
	"email": "ednaldo@gmail.com",
	"password": "senha_secreta_do_ednaldo"
}
```
O retorno deve ser:
```json
{
	"_id": "123456789123",
	"name": "Ednaldo",
	"email": "ednaldo@gmail.com",
	"token": "eyJhbGciOiJIUzI1NIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFfsefscCFrD43ZXhwIjoxNjQ0MzY4NTQwfQ.jFr2oShUqNHY_vXSz3GDQVlki4urSYvzo"
}
```
#### Logar com usuário:

```bash
https://eatflavor-bd.herokuapp.com/login
```
A estrutura para fazer login deve ser essa:
```json
{
	"name": "Ednaldo",
	"email": "ednaldo@gmail.com",
	"password": "senha_secreta_do_ednaldo"
}
```
O retorno deve ser:
```json
{
	"_id": "ednaldo@gmail.com",
	"name": "Ednaldo",
	"token": "eyJhbGciOiJIUzI1NIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFfsefscCFrD43ZXhwIjoxNjQ0MzY4NTQwfQ.jFr2oShUqNHY_vXSz3GDQVlki4urSYvzo"
}
```