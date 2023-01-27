const mysql = require('mysql2');
require('dotenv').config();

class Conexion {

    constructor() {
        this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            connectionLimit: process.env.DB_MAXCONNECTIONS, //Por defecto son 10.
            port: process.env.DB_PORT

            // host: '192.168.100.7',
            // user: 'user',
            // password: 'test',
            // database: 'donantes_puertollano',
            // connectionLimit: 10,
            // port: 3306
        };

        this.pool = mysql.createPool(this.config);
    }

    query = (sql, values) => {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length === 0) {
                        reject(err);
                    }
                    resolve(rows);
                }
            });
        });
    }
}


const conexion = new Conexion();

module.exports = conexion;

