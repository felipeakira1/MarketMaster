const db = require('./database');

async function getUserByUsername(username) {
    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return results;
    } catch(err) {
        console.error('Erro ao realizar consulta ao banco de dados: ', err);
        res.status(500).send('Erro interno do servidor.');
    }
}

module.exports = {
    getUserByUsername
}