const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const {conexion, sequelize} = require('../database/Conexion');

class Server {

    constructor() {
        this.app = express();
        this.path = '/api/';
        this.apto_sangre = "/test-apto";

        //Middlewares
        this.middlewares();

        this.routes();
        
    }
    
    middlewares() {
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json());
    }

    routes(){
        // this.app.use(this.path , require('../routes/routes'));
        this.app.use(this.apto_sangre, require('../routes/apto_sangre'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;