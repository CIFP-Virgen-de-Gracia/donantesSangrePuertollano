const Noticias = require('../../models/Noticias');
const Imagen = require('../../models/Imagen');
const sequelize = require('../ConexionSequelize');
const Noticia = require('../../models/Noticias');
const Op = require("sequelize");
const fileUpload = require('express-fileupload');
const File = require('../../helpers/FileUpload');

//Todo Isa
class QueriesNoticias {
    constructor() {
        this.sequelize = sequelize;
    }
    insertarNoticias = async (req) => {
        let resultado = 0
        let data="";
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

                let fecha = new Date(noticia.createdAt).toLocaleString();
                let parrafo = noticia.contenido.split("\n");
                data = {
                    "id": resp.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": parrafo,
                    "fecha": fecha,
                    "imagen": noticia["Imagen"]
                }


                resultado = 1

            } else {

                noticia.id = null;
                noticia.titulo = req.body.titulo;
                noticia.subtitulo = req.body.subtitulo;
                noticia.contenido = req.body.contenido;
                noticia.seccion = req.body.seccion;
                const resp = await noticia.save();

                const nombre = await File.subirArchivo(req.files, undefined, 'noticias');
                const ruta = "http://127.0.0.1:8090/api/Noticias/upload/" + nombre;

                let imagen = new Imagen();
                imagen.idNoticia = resp.id;
                imagen.nombre = ruta;
                imagen.save();
                resultado = 1

                let fecha = new Date(noticia.createdAt).toLocaleString();
                let parrafo = noticia.contenido.split("\n");
                data = {
                    "id": resp.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": parrafo,
                    "fecha": fecha,
                    "imagen": ruta
                }

            }

        } catch (err) {
            resultado = 0
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
        const noticias = await Noticias.findByPk(id, { include: "Imagen" });
        this.sequelize.desconectar();
        return noticias;
    }
    getImagen = async (nombre) => {
        this.sequelize.conectar();
        const imagen = await Imagen.findOne({
            where: { nombre: nombre }
        });

        this.sequelize.desconectar();
        return imagen;
    }

    modificarNoticia = async (id, req) => {
        this.conectar();
        let resultado = await Noticia.findByPk(id);
        if (!resultado) {
            this.desconectar();
            throw error;
        }
        if (req.body.imagen === undefined) {
            let data = {
                titulo: req.body.titulo,
                subtitulo: req.body.subtitulo,
                contenido: req.bodycontenido,
                seccion: req.body.seccion
            }
            await resultado.update(data);
        } else {
            let data = {
                titulo: req.body.titulo,
                subtitulo: req.body.subtitulo,
                contenido: req.bodycontenido,
                seccion: req.body.seccion
            }
            await resultado.update(data);
            let foto = await Imagen.findByPk(id);
            if (!foto) {
                await Imagen.create({
                    idNoticia: id,
                    nombre: req.body.name,
                    url: req.body.url
                });
            } else {
                let img = {
                    nombre: req.body.name,
                    url: req.body.url
                }
                await foto.update(img);
            }
        }
        this.desconectar();
        return resultado;

    }

    borrarNoticia = async (id) => {
        this.conectar();
        let resultado = await Noticia.findByPk(id);
        if (!resultado) {
            this.sequelize.desconectar();
            throw error;
        }
        await resultado.destroy();
        this.sequelize.desconectar();
        return resultado;
    }
}
const queriesNoticias = new QueriesNoticias();

module.exports = queriesNoticias;