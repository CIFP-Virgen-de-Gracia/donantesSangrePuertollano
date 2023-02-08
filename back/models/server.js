const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const {conexion, sequelize} = require('../database/Conexion');
const fileupload = require("express-fileupload");

//Mario
class Server {

    constructor() {
        this.app = express();
        this.path = '/api/';

        this.apto_sangre = "/test-apto";
        this.pathNoticias='/api/Noticias/'
        

        //Middlewares
        this.middlewares();

        this.routes();

    }
    
    middlewares() {
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true 
        }));
    }

    routes(){

        // this.app.use(this.path , require('../routes/routes'));
        this.app.use(this.apto_sangre, require('../routes/apto_sangre'));

        this.app.use(this.path , require('../routes/routes'));
        this.app.use(this.pathNoticias , require('../routes/NoticiasRoutes'));

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;