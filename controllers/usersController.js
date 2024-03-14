const bcrypt = require('bcrypt');

const { getUserByUsername, insertUser } = require('../models/usersModel');

async function login(req, res) {
    const {username, password} = req.body;

    try {
        const user = await getUserByUsername(username);

        if(user) {
            if(user.password == password) {
                console.log("Usuário conectado!");
                res.status(200).json(user);
            } else {
                console.log("Senha incorreta");
                res.status(401).send("401 (Unauthorized: Senha incorreta)")
            }
        } else {
            console.log("Usuario nao encontrado");
            res.status(404).send("404 (Not Found)");
        }
    } catch(err) {
        console.error(err);
        res.status(500).send("Erro ao buscar usuario");
    }
}

async function register(req, res) {
    const saltRounds = 10;

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    };

    user.password = await bcrypt.hash(user.password, saltRounds);
    
    try {
        const resultFromInsert = await insertUser(user);
        console.log(resultFromInsert);
        if(resultFromInsert.affectedRows > 0) {
            res.status(201).json({message: 'User added successfully'});
        } else {
            res.status(400).json({message: 'Failed to register user'});
        }
    } catch(err) {
        if(err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({message: err.message});
        } else {
            console.error('Failed to register user', err);
            res.status(500).json({message: 'Erro interno do servidor'});
        }
    }
}

module.exports = {
    login,
    register
}