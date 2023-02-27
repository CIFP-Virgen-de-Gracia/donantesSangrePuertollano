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
                let parrafo = noticia.contenido.split("\n");

                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": parrafo,
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
                let parrafo = noticia.contenido.split("\n");

                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": parrafo,
                    "fecha": fecha,
                    "imagen": imagen
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
                    attributes: [],
                    as: 'Imagen'
                }
            ],
            attributes: ['id', 'titulo', 'subtitulo', 'contenido', 'seccion', 'createdAt',  
                        [Sequelize.col('Imagen.nombre'), 'nombreImagen'],
                        [Sequelize.col('Imagen.id'), 'idImagen']],
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
                        attributes: [],
                        as: 'Imagen'
                    }
                ],
                attributes: ['id', 'titulo', 'subtitulo', 'contenido', 'seccion', 'createdAt',  
                            [Sequelize.col('Imagen.nombre'), 'nombreImagen'],
                            [Sequelize.col('Imagen.id'), 'idImagen']],
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
                            attributes: [],
                            as: 'Imagen'
                        }
                    ],
                    attributes: ['id', 'titulo', 'subtitulo', 'contenido', 'seccion', 'createdAt',  
                                [Sequelize.col('Imagen.nombre'), 'nombreImagen'],
                                [Sequelize.col('Imagen.idNoticia'), 'idNoticia'],
                                [Sequelize.col('Imagen.id'), 'idImagen']],
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
                    let parrafo = resp.contenido.split("\n");

                    data = {
                        "id": resp.id,
                        "titulo": resp.titulo,
                        "subtitulo": resp.subtitulo,
                        "contenido": parrafo,
                        "fecha": fecha,
                        "imagen": ""
                    }

                } else {
                    noticia.id = noticia.id;
                    noticia.titulo = req.body.titulo;
                    noticia.subtitulo = req.body.subtitulo;
                    noticia.contenido = req.body.contenido;
                    noticia.seccion = noticia.seccion;
                    noticia.save();

                    if (noticia.dataValues.nombreImagen != null) {
                        const pathImagen = path.join(__dirname, '../../uploads', "noticias", noticia.dataValues.nombreImagen);
                        if (fs.existsSync(pathImagen)) {
                            fs.unlinkSync(pathImagen);
                        }
                        const nombre = await models.File.subirArchivo(req.files, undefined, 'noticias');

                        noticia.dataValues.idNoticia = noticia.id;
                        noticia.dataValues.nombreImagen = nombre;
                        noticia["Imagen"][0].save();

                    } else {
                        const nombre = await File.subirArchivo(req.files, undefined, 'noticias');

                        let imagen = models.Imagen.create();
                        imagen.idNoticia = noticia.id;
                        imagen.nombre = nombre;
                        imagen.save();
                    }

                    let fecha = new Date(noticia.createdAt).toLocaleString();
                    let parrafo = noticia.contenido.split("\n");

                    data = {
                        "id": noticia.id,
                        "titulo": noticia.titulo,
                        "subtitulo": noticia.subtitulo,
                        "contenido": parrafo,
                        "fecha": fecha,
                        "imagen": "http://127.0.0.1:8090/api/noticias/upload/" + noticia.dataValues.idImagen
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
        let noticia = await models.Noticia.findOne(
            {
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
            const pathImagen = path.join(__dirname, '../../uploads', "noticias", noticia["Imagen"][0]["nombre"]);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }

            const imagen = await this.getImagen(noticia["Imagen"][0].id);
            await imagen.destroy();
        }
        
        await noticia.destroy();

        this.sequelize.desconectar();
        return noticia;
    }
}


const queriesNoticias = new QueriesNoticias();

module.exports = queriesNoticias;