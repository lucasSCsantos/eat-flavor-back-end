<h1 align="center">
  <img alt="Logo" src="https://i.imgur.com/lY7ZWok.png" width="250px" />
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasSCsantos/pokedexApp">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucasSCsantos/pokedexApp">
  <img alt="Stars" src="https://img.shields.io/github/stars/lucasSCsantos/pokedexApp">
  <img alt="Repository Size" src="https://img.shields.io/github/repo-size/lucasSCsantos/pokedexApp">
</p>

<h3 align="center">
  A api está hospedada no Heroku e pode ser acessada através da url: 
	<br/>
	"https://eatflavor-bd.herokuapp.com/"
</h3>

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

## End Points

### Produtos
>#### Listar todos os produtos:
>
>```bash
>https://eatflavor-bd.herokuapp.com/products
>```
>```json
>{
> "products": [
>	{
> 	"name": "Serradura",
>		"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
>  	"price": 6.99,
>		"url_image": "https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/ea56688d-2686-11e6-8943-d4ae52b7884c.jpeg?itok=wvgxZgPt",
>		"category": "dessert",
>		"type": "Fria"
>	},
>...
]
>}
>```
>#### Acessar um produto pelo id:
>
>```bash
>https://eatflavor-bd.herokuapp.com//products/:id
>```
>```json
>{
> "name": "Serradura",
>	"description": "Uma sobremesa cremosa e saborosa, misturada com o crocante da bolacha triturada",
>  "price": 6.99,
>	"url_image": "https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/ea56688d-2686-11e6-8943-d4ae52b7884c.jpeg?itok=wvgxZgPt",
>	"category": "dessert",
>	"type": "Fria"
>}
>```
>#### Adicionar um time:
>
>```bash
>https://eatflavor-bd.herokuapp.com//products
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
### Ligas
>#### Acessar todas as ligas:
>
>```bash
>https://eatflavor-bd.herokuapp.com//leagues
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
>https://eatflavor-bd.herokuapp.com//leagues/:id
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
>https://eatflavor-bd.herokuapp.com//leagues
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
>https://eatflavor-bd.herokuapp.com//leagues/:id
>```
### Jogadores
>#### Acessar todos os jogadores:
>
>```bash
>https://eatflavor-bd.herokuapp.com//players
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
>https://eatflavor-bd.herokuapp.com//players/:id
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
>https://eatflavor-bd.herokuapp.com//players
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
>https://eatflavor-bd.herokuapp.com//players/:id
>```
### Cidades
>#### Acessar todas as cidades:
>
>```bash
>https://eatflavor-bd.herokuapp.com//cities
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
>https://eatflavor-bd.herokuapp.com//cities/:id
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
>https://eatflavor-bd.herokuapp.com//cities
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
>https://eatflavor-bd.herokuapp.com//cities/:id
>```
