const { getUserByUsername } = require('../models/usersModel');

function showUserByUsername(username) {
    const results = getUserByUsername(username);
    if(results) {
        console.log(results);
    } else {
        console.log('Nenhum resultado encontrado.');
    }
}

module.exports = {
    showUserByUsername
}