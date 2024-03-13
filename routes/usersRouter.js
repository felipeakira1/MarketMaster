const express = require('express');
const user = express.Router();

const path = require('path');
user.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/html/login.html'));
});

user.post('/login', async (req, res) => {
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
});

module.exports = user;