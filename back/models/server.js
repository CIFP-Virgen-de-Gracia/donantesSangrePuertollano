const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const {conexion, sequelize} = require('../database/Conexion');

class Server {

    constructor() {
        this.app = express();
        this.path = '/api/';

        //Middlewares
        this.middlewares();

        this.routes();
        
    }
    

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.path , require('../routes/routes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;