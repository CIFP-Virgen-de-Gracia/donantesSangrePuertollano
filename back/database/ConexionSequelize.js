const mysql = require('mysql2');
const {Sequelize} = require('sequelize'); 
require('dotenv');


class CnxnSequelize {
    
    constructor() {
        this.db = new Sequelize('donantes', 'mario', 'Chubaca2022', {
            host: 'localhost',
            dialect:'mysql',
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });

    }

    conectar = () => {
        this.db.authenticate().then(() => {
            console.log('Connection has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

    desconectar = () => {
        process.on('SIGINT', () => conn.close())
    }

    sync = () => {
        this.db.sync().then(() => {
            console.log('Table created successfully!');
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    }
}

const sequelize = new CnxnSequelize();

module.exports = sequelize;
