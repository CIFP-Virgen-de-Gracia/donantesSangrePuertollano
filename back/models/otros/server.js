const express = require('express');
// const body_parser = require('body-parser');
const cors = require('cors');
const {conexion, sequelize} = require('../../database/Conexion');
const fileupload = require("express-fileupload");

//Mario
class Server {

    constructor() {
        this.app = express();
        this.path = '/api/';

        this.pathAptoSangre = "/test-apto";
        this.pathNoticias='/api/noticias/';
        this.pathGaleria = "/api/galeria";
        this.pathMusica = "/api/musica";
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

        this.app.use(this.pathAptoSangre, require('../../routes/aptoSangreRoutes'));
        this.app.use(this.pathGaleria, require ('../../routes/galeria_Routes'));
        this.app.use(this.path, require('../../routes/routes'));
        this.app.use(this.pathNoticias , require('../../routes/noticiasRoutes'));
        this.app.use(this.pathMusica , require('../../routes/CancionRoute'));

    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en: ${process.env.PORT}`);
        })
    }
}

module.exports = Server;