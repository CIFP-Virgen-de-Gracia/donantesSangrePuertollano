const Cancion = require('../../models/Cancion');
const sequelize = require('../ConexionSequelize');
const path = require("path");
const fs = require("fs");
const File = require('../../helpers/FileUpload');

class QueriesMusica {
    constructor() {
        this.sequelize = sequelize;
    }

    insertarCancion = async (req) => {
        let cancion = new Cancion();
        let data = "";
        this.sequelize.conectar();
        try {
            if (req.files) {
                const nombre = await File.subirArchivo(req.files, ["mp3", "mp4"], 'musica');
                cancion.id = null;
                cancion.nombre = nombre;
                cancion.titulo = req.body.titulo;
                cancion.letra = req.body.letra;
                const resp = await cancion.save();
                data = {
                    "id": resp.id,
                    "nombre": nombre,
                    "titulo": resp.titulo,
                    "letra": resp.letra,
                    "cancion": process.env.URL_PETICION + process.env.PORT + "/api/Musica/upload/" + cancion.id,
                    "descarga":process.env.URL_PETICION + process.env.PORT + "/api/Musica/download/" + cancion.id,
                }
                this.sequelize.desconectar();
            }
        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }
        return data;
    }
    modificarCancion = async (req) => {
        let data = "";
        this.sequelize.conectar();
        try {
            let cancion = await Cancion.findByPk(req.body.id);
            if (cancion) {
                if (!req.files) {
                    cancion.id = cancion.id;
                    cancion.nombre = cancion.nombre;
                    cancion.titulo = req.body.titulo;
                    cancion.letra = req.body.letra;
                    cancion.save();

                    data = {
                        "id": cancion.id,
                        "nombre": cancion.nombre,
                        "titulo":cancion.titulo,
                        "letra": cancion.letra,
                        "cancion": process.env.URL_PETICION + process.env.PORT + "/api/Musica/upload/" + cancion.id,
                        "descarga":process.env.URL_PETICION + process.env.PORT + "/api/Musica/download/" + cancion.id,

                    }

                } else {

                    const pathMusic = path.join(__dirname, '../../uploads', "musica", cancion.nombre);
                    if (fs.existsSync(pathMusic)) {
                        fs.unlinkSync(pathMusic);
                    }
                    const nombre = await File.subirArchivo(req.files, ["mp3", "mp4"], 'musica');

                    cancion.id = cancion.id;
                    cancion.nombre = nombre;
                    cancion.letra = req.body.letra;
                    cancion.titulo=req.body.titulo;
                    cancion.save();

                    data = {
                        "id": cancion.id,
                        "nombre": cancion.nombre,
                        "titulo":cancion.titulo,
                        "letra": cancion.letra,
                        "cancion": process.env.URL_PETICION + process.env.PORT + "/api/Musica/upload/" + cancion.id,
                        "descarga":process.env.URL_PETICION + process.env.PORT + "/api/Musica/download/" + cancion.id,
                    }
                }
            }
        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }

        this.sequelize.desconectar();
        return data;
    }
    getListado = async () => {
        let canciones = "";
        try {
            this.sequelize.conectar();
            canciones = await Cancion.findAll({ order: [['createdAt', 'DESC'], ['id', 'DESC']] });
            this.sequelize.desconectar();
        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }
        return canciones;
    }
    getCancion = async (id) => {
        let cancion = "";
        try {
            cancion = await Cancion.findByPk(id);
        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }
        return cancion;
    }
    borrarCancion = async (id) => {
        this.sequelize.conectar();
        let cancion = await Cancion.findByPk(id);
        if (!cancion) {
            this.sequelize.desconectar();
            throw error;
        }
        const pathMusic = path.join(__dirname, '../../uploads', "musica", cancion.nombre);
        if (fs.existsSync(pathMusic)) {
            fs.unlinkSync(pathMusic);
        }
        await cancion.destroy();
        this.sequelize.desconectar();
        return cancion;
    }

}
const queriesMusica = new QueriesMusica();

module.exports = queriesMusica;
