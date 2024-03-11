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

app.post('/get-user', async (req, res) => {
    const { username } = req.body;
    console.log(username);
    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        if(user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(404).send('Usuario nao encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar usuario');
    }
})

app.get('/get-user', async (req, res) => {
    
    const username = 'felipeakira1';
    try {
        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

        console.log(user);
        res.send('user')
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar usuario');
    }
})

app.listen(process.env.SERVER, () => {
    console.log(`Server started on <http://localhost:${process.env.SERVER}>`);
})