import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from '../routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;

app.get('/', (req, res) => res.send());
app.use('/', router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}!`));
