const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'MarketMaster'
});

module.exports = pool;