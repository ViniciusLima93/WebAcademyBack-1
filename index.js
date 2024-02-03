const express = require('express');
const db = require('./db');

const app = express();
const port = 3000;

// Remova a linha referente ao body-parser
// app.use(bodyParser.json());

// Remova a linha referente ao cors
// app.use(cors());

const routes = require('./routes');
app.use(express.json()); 

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});