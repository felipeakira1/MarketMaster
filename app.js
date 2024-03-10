const express = require('express');
const app = express();
const db = require('./models/database');

// dotenv
require('dotenv').config();

// Middleware to serve static files from the public folder
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/test.html'));
    /*try {
        const [results] = await db.query('SELECT * FROM users');
        if(results[0].username == 'felipeakira1') {
            res.send("felipeakira1 encontrado com sucesso!");
        }
    } catch(err) {
        console.error('Erro ao realizar consulta ao banco de dados: ', err);
        res.status(500).send('Erro interno do servidor.');
    };*/
});

app.listen(process.env.SERVER, () => {
    console.log(`Server started on <http://localhost:${process.env.SERVER}>`);
})