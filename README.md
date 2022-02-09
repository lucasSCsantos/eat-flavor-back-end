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

### Times
>#### Acessar todos os times:
>
>```bash
>http://localhost:3000/teams
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
>#### Acessar apenas um time:
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
