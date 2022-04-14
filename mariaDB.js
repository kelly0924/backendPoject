const mariadb=require("mysql")

let connection = mariadb.createConnection({
    host: '127.0.0.1',
    port:3306,
    user: 'backendProject',
    password: '1234',
    database: 'backendProjectDB'
});

module.exports = connection;