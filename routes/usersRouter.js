const express = require('express');
const user = express.Router();
const { login } = require('../controllers/usersController');

const path = require('path');
user.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/html/login.html'));
});

user.post('/login', login);

module.exports = user;