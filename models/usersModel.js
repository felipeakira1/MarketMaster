const db = require('./database');

async function getUserByUsername(username) {
    try {
        const [result] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return result.length > 0 ? result[0] : null;
    } catch(err) {
        console.error('Erro ao realizar consulta ao banco de dados: ', err);
        res.status(500).send('Erro interno do servidor.');
    }
}

async function insertUser(user) {
    try {
        const result = await db.query('INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)',
                                        [user.username, user.email, user.password, user.name]);
        return result;
    } catch(err) {
        if(err.code === 'ER_DUP_ENTRY') {
            const isUsernameDuplicate = err.message.includes('username');
            const isEmailDuplicate = err.message.includes('email');
            throw { code: err.code, message: isUsernameDuplicate ? 'Username already exists' : isEmailDuplicate ? 'Email already exists' : 'Duplicate entry found'}
        } else {
            console.error('Error adding user to database.');
            throw err;
        }
    }
}

module.exports = {
    getUserByUsername,
    insertUser
}