const mysql = require('mysql2');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password : 'Vini!2502',
        database: 'mapinguari',
    }
);


module.exports = connection;