<h1 align="center">
  <img alt="Logo" src="https://i.imgur.com/lY7ZWok.png" width="250px" />
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasSCsantos/pokedexApp">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasSCsantos/pokedexApp">
  <img alt="Stars" src="https://img.shields.io/github/stars/lucasSCsantos/pokedexApp">
  <img alt="Repository Size" src="https://img.shields.io/github/repo-size/lucasSCsantos/pokedexApp">
</p>

<h1 align="center">
  A api está hospedada no Heroku e pode ser acessada através da url: 
	"https://eatflavor-bd.herokuapp.com/"
</h1>

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

1. Clone o repositório

2. Instale as dependencias

```javascript
npm install
```

3. Rode o app

```javascript
npm start
```

## End Points

### Produtos
>#### Listar todos os produtos:
>
>```bash
>https://eatflavor-bd.herokuapp.com/products
>```
>```json
>[
>   { 
>     "id": 1,
>     "team": "PSG",
>     "rating": 84,
>     "city": "Paris",
>     "country": "France",
>     "league": "Ligue 1",
>     "players": [],
>   },
>   ...
> ]
>```
>#### Acessar um produto pelo id:
>
>```bash
>http://localhost:3000/teams/:id
>```
>```json
>  { 
>    "id": 1,
>    "team": "PSG",
>    "rating": 84,
>    "city": "Paris",
>    "country": "France",
>    "league": "Ligue 1",
>    "players": [
>       {
>         "id": 1,
>         "player": "Neymar"
>       },
>     ...
>    ],
>  }
>```
>#### Adicionar um time:
>
>```bash
>http://localhost:3000/teams
>```
>A estrutura para adicionar um time deve ser essa:
>```json
>{
>   "team": "Lazio",
>   "team_rating": 80,
>		"city_id": 5, //Roma
>   "country_id": 4, //Itália
>   "league_id": 4 //Calcio A
>}
>```
>#### Deletar um time:
>
>```bash
>http://localhost:3000/teams/:id
>```
### Ligas
>#### Acessar todas as ligas:
>
>```bash
>http://localhost:3000/leagues
>```
>```json
>[
>		{
>			"id": 1,
>			"league": "Premier League",
>			"country": "England"
>		},
>		{
>			"id": 2,
>			"league": "La Liga",
>			"country": "Spain"
>		},
>		...
>]
>```
>#### Acessar apenas uma liga:
>
>```bash
>http://localhost:3000/leagues/:id
>```
>```json
>{
>		"id": 1,
>		"league": "Premier League",
>		"country": "England"
>},
>```
>#### Adicionar uma liga:
>
>```bash
>http://localhost:3000/leagues
>```
>A estrutura para adicionar uma liga deve ser essa:
>```json
>{
>		"league": "2. Bundesliga",
>		"country_id": 5 //Alemanha
>}
>```
>#### Deletar uma liga:
>
>```bash
>http://localhost:3000/leagues/:id
>```
### Jogadores
>#### Acessar todos os jogadores:
>
>```bash
>http://localhost:3000/players
>```
>```json
>[
>  { 
>    "id": 1,
>    "team": "PSG",
>    "rating": 84,
>    "city": "Paris",
>    "country": "France",
>    "league": "Ligue 1",
>    "players": [],
>  },
>  ...
>]
>```
>#### Acessar apenas um jogador:
>
>```bash
>http://localhost:3000/players/:id
>```
>```json
>{
>   "id": 1,
>   "player": "Neymar",
>   "team": "PSG"
>}
>```
>#### Adicionar um jogador:
>
>```bash
>http://localhost:3000/players
>```
>A estrutura para adicionar um jogador deve ser essa:
>```json
>{
>   "player": "Jota",
>   "team_id": 6 // Liverpool
>}
>```
>#### Deletar um jogador:
>
>```bash
>http://localhost:3000/players/:id
>```
### Cidades
>#### Acessar todas as cidades:
>
>```bash
>http://localhost:3000/cities
>```
>```json
>[
>		{
>			"id": 1,
>			"city": "Manchester",
>			"country": "England"
>		},
>		{
>			"id": 2,
>			"city": "Madrid",
>			"country": "Spain"
>		},
>		...
>]
>```
>#### Acessar apenas uma cidade:
>
>```bash
>http://localhost:3000/cities/:id
>```
>```json
>{
>		"id": 1,
>		"league": "Manchester",
>},
>```
>#### Adicionar uma cidade:
>
>```bash
>http://localhost:3000/cities
>```
>A estrutura para adicionar uma cidade deve ser essa:
>```json
>{
>		"city": "Leicester",
>		"country_id": 1 //Inglaterra
>}
>```
>#### Deletar uma cidade:
>
>```bash
>http://localhost:3000/cities/:id
>```
