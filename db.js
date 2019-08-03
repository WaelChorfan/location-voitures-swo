const mysql = require('mysql');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

var database = new Database(
    {
        host: "localhost",
        user: "root",
        password: "0000",
        database: "stagebdd",
        port: 3306
    })

// var dwh = new Database(
//     {
//         host: process.env.host,
//         user: process.env.user,
//         password: process.env.password,
//         database: process.env.dwh,
//         port: process.env.mysql_port
//     })

module.exports = {
    database
    // ,dwh
};


