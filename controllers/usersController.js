const bcrypt = require('bcrypt');

const { getUserByUsername } = require('../models/usersModel');

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

async function hashPassword (req, res) {
    try {
        const { password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        res.json({ hashedPassword });
    } catch(err) {
        console.error(error);
        res.status(500).send('Erro ao gerar o hash da senha');
    }
}
module.exports = {
    login,
    hashPassword
}