const express = require('express');
const user = express.Router();
const { login, hashPassword } = require('../controllers/usersController');

const path = require('path');
user.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/html/login.html'));
});

user.post('/login', login);

user.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/html/register.html'));
});

user.post('/hash-password', hashPassword);

module.exports = user;