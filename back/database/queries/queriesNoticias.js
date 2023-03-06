const Sequelize = require('sequelize');
const sequelize = require('../ConexionSequelize');
const path = require("path");
const fs = require("fs");
const File = require('../../helpers/FileUpload');
const models = require('../../models/index.js');


//Todo Isa
class QueriesNoticias {
    constructor() {
        this.sequelize = sequelize;
    }

    insertarNoticias = async (req) => {
        let data = "";
        this.sequelize.conectar();

        try {
            let noticia = await models.Noticia.create({
                titulo: req.body.titulo,
                subtitulo: req.body.subtitulo,
                contenido: req.body.contenido,
                seccion: req.body.seccion
            });
            
            if (!req.files) {
                let fecha = new Date(noticia.createdAt).toLocaleString();

                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "fecha": fecha,
                    "imagen": ""
                }

            } else {
                const nombre = await File.subirArchivo(req.files, undefined, 'noticias');
                
                let imagen = await models.Imagen.create({
                    idNoticia: noticia.id,
                    nombre: nombre
                });

                let fecha = new Date(noticia.createdAt).toLocaleString();

                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "fecha": fecha,
                    "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" + imagen.id
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

        const noticias = await models.Noticia.findAll({
            where: { seccion: seccion },
            include: [
                {
                    model: models.Imagen,
                    as: 'Imagen'
                }
            ],
            order: [['createdAt', 'DESC'], ['id', 'DESC']],
        });

        this.sequelize.desconectar();
        return noticias;
    }


    getNoticia = async (id) => {
        this.sequelize.conectar();
        const noticias = await models.Noticia.findOne(
            {
                where: { id: id },
                include: [
                    {
                        model: models.Imagen,
                        as: 'Imagen'
                    }
                ]
            });
        this.sequelize.desconectar();
        return noticias;
    }


    getImagen = async (id) => {
        this.sequelize.conectar();
        const imagen = await models.Imagen.findByPk(id);
        this.sequelize.desconectar();
        return imagen;
    }


    borrarImagen = async (id) => {
        const imagen = await this.getImagen(id);
        await imagen.destroy();
    }


    modificarNoticia = async (req) => {
        let data = "";

        this.sequelize.conectar();
        try {
            let noticia = await models.Noticia.findOne(
                {
                    where: { id: req.body.id },
                    include: [
                        {
                            model: models.Imagen,
                            as: 'Imagen'
                        }
                    ],
                });

            if (noticia) {
                if (!req.files) {
                    noticia.id = noticia.dataValues.id;
                    noticia.titulo = req.body.titulo;
                    noticia.subtitulo = req.body.subtitulo;
                    noticia.contenido = req.body.contenido;
                    noticia.seccion = noticia.dataValues.seccion;
                    noticia.updatedAt = new Date();
                    const resp = await noticia.save();

                    let fecha = new Date(noticia.createdAt).toLocaleString();

                    if (noticia["Imagen"].length > 0) {
                        data = {
                            "id": resp.id,
                            "titulo": resp.titulo,
                            "subtitulo": resp.subtitulo,
                            "contenido": resp.contenido,
                            "fecha": fecha,
                            "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" + imagen.id
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
                    noticia.id = noticia.dataValues.id;
                    noticia.titulo = req.body.titulo;
                    noticia.subtitulo = req.body.subtitulo;
                    noticia.contenido = req.body.contenido;
                    noticia.seccion = noticia.dataValues.seccion;
                    noticia.updatedAt = new Date();
                    await noticia.save();

                    if (noticia["Imagen"].length > 0) {
                        const pathImagen = path.join(__dirname, '../../uploads', "noticias", noticia["Imagen"][0]["nombre"]);
                        if (fs.existsSync(pathImagen)) {
                            fs.unlinkSync(pathImagen);
                        }
                        const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                        noticia["Imagen"][0]["idNoticia"] = noticia.dataValues.id;
                        noticia["Imagen"][0]["nombre"] = nombre;
                        noticia["Imagen"][0].save();

                    } else {
                        const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                        let imagen = await models.Imagen.create({
                            idNoticia: noticia.dataValues.id,
                            nombre: nombre
                        });
                    }

                    let fecha = new Date(noticia.createdAt).toLocaleString();

                    data = {
                        "id": noticia.id,
                        "titulo": noticia.titulo,
                        "subtitulo": noticia.subtitulo,
                        "contenido": noticia.contenido,
                        "fecha": fecha,
                        "imagen": process.env.URL_PETICION + process.env.PORT + "/api/Noticias/upload/" +  noticia["Imagen"][0]["id"]
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
        let noticia = await models.Noticia.findOne({
            where: { id: id },
            include: [
                {
                    model: models.Imagen,
                    as: 'Imagen'
                }
            ]
        });

        if (!noticia) {
            this.sequelize.desconectar();
            throw error;
        }
        
        if (noticia["Imagen"].length > 0) {
            await this.borrarImagen(noticia["Imagen"][0].id);

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