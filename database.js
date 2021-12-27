const fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json", 'utf8'));
const mysql = require('mysql');

var pool = mysql.createPool({
        connectionLimit: config.mysql_connection_limit,
        host : config.mysql_host,
        user : config.mysql_user,
        password : config.mysql_password,
	database : config.mysql_database
});
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release();
    return
});
module.exports = pool;

