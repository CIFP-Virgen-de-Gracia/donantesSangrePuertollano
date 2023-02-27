const Noticias = require('../../models/Noticias');
const Imagen = require('../../models/Imagen');
const sequelize = require('../ConexionSequelize');
const Noticia = require('../../models/Noticias');
const Op = require("sequelize");
const path = require("path");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const File = require('../../helpers/FileUpload');

//Todo Isa
class QueriesNoticias {
    constructor() {
        this.sequelize = sequelize;
    }

    insertarNoticias = async (req) => {
        let data = "";
        this.sequelize.conectar();
        try {
            let noticia = new Noticia();

            if (!req.files) {

                noticia.id = null;
                noticia.titulo = req.body.titulo;
                noticia.subtitulo = req.body.subtitulo;
                noticia.contenido = req.body.contenido;
                noticia.seccion = req.body.seccion;
                const resp = await noticia.save();

                let fecha = new Date(resp.createdAt).toLocaleString();

                data = {
                    "id": resp.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "fecha": fecha,
                    "imagen": ""
                }

            } else {

                noticia.id = null;
                noticia.titulo = req.body.titulo;
                noticia.subtitulo = req.body.subtitulo;
                noticia.contenido = req.body.contenido;
                noticia.seccion = req.body.seccion;
                const resp = await noticia.save();

                const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                let imagen = new Imagen();
                imagen.idNoticia = resp.id;
                imagen.nombre = nombre;
                imagen.save();

                let fecha = new Date(resp.createdAt).toLocaleString();

                data = {
                    "id": resp.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "fecha": fecha,
                    "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" + resp.id,
                }
            }
        } catch (err) {
            throw err;
        }

        this.sequelize.desconectar();
        return data;
    }

    getListado = async (seccion) => {
        this.sequelize.conectar();
        const noticias = await Noticias.findAll(
            {
                where: { seccion: seccion },
                include: "Imagen",
                order: [['createdAt', 'DESC'], ['id', 'DESC']]
            });
        this.sequelize.desconectar();
        return noticias;
    }
    getNoticia = async (id) => {
        this.sequelize.conectar();
        const noticias = await Noticias.findOne(
            {
                where: { id: id },
                include: "Imagen",

            });
        this.sequelize.desconectar();
        return noticias;
    }
    getImagen = async (id) => {
        this.sequelize.conectar();
        const imagen = await Imagen.findByPk(id);
        this.sequelize.desconectar();
        return imagen;
    }

    modificarNoticia = async (req) => {
        let data = "";
        console.log(req.body);
        console.log(req.files);
        this.sequelize.conectar();
        try {
            let noticia = await Noticias.findOne(
                {
                    where: { id: req.body.id },
                    include: "Imagen",

                });

            if (noticia) {
                if (!req.files) {
                    noticia.id = noticia.id;
                    noticia.titulo = req.body.titulo;
                    noticia.subtitulo = req.body.subtitulo;
                    noticia.contenido = req.body.contenido;
                    noticia.seccion = noticia.seccion;
                    const resp = await noticia.save();

                    let fecha = new Date(noticia.createdAt).toLocaleString();
                    if (noticia["Imagen"].length > 0) {
                        data = {
                            "id": resp.id,
                            "titulo": resp.titulo,
                            "subtitulo": resp.subtitulo,
                            "contenido": resp.contenido,
                            "fecha": fecha,
                            "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" + noticia.id
                        }
                    } else {
                        data = {
                            "id": resp.id,
                            "titulo": resp.titulo,
                            "subtitulo": resp.subtitulo,
                            "contenido": resp.contenido,
                            "fecha": fecha,
                            "imagen": ""
                        }
                    }

                } else {

                    noticia.id = noticia.id;
                    noticia.titulo = req.body.titulo;
                    noticia.subtitulo = req.body.subtitulo;
                    noticia.contenido = req.body.contenido;
                    noticia.seccion = noticia.seccion;
                    noticia.save();

                    if (noticia["Imagen"].length > 0) {
                        const pathImagen = path.join(__dirname, '../../uploads', "noticias", noticia["Imagen"][0]["nombre"]);
                        if (fs.existsSync(pathImagen)) {
                            fs.unlinkSync(pathImagen);
                        }
                        const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                        noticia["Imagen"][0]["idNoticia"] = noticia.id;
                        noticia["Imagen"][0]["nombre"] = nombre;
                        noticia["Imagen"][0].save();

                    } else {

                        const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                        let imagen = new Imagen();
                        imagen.idNoticia = noticia.id;
                        imagen.nombre = nombre;
                        imagen.save();
                    }

                    let fecha = new Date(noticia.createdAt).toLocaleString();

                    data = {
                        "id": noticia.id,
                        "titulo": noticia.titulo,
                        "subtitulo": noticia.subtitulo,
                        "contenido": noticia.contenido,
                        "fecha": fecha,
                        "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" + noticia.id
                    }
                }
            }

        } catch (err) {
            throw err;
        }

        this.sequelize.desconectar();
        return data;
    }

    borrarNoticia = async (id) => {
        this.sequelize.conectar();
        let noticia = await Noticias.findOne(
            {
                where: { id: id },
                include: "Imagen",

            });
        if (!noticia) {
            this.sequelize.desconectar();
            throw error;
        }
        if (noticia["Imagen"].length > 0) {
            const pathImagen = path.join(__dirname, '../../uploads', "noticias", noticia["Imagen"][0]["nombre"]);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
        await noticia.destroy();
        this.sequelize.desconectar();
        return noticia;
    }
}
const queriesNoticias = new QueriesNoticias();

module.exports = queriesNoticias;