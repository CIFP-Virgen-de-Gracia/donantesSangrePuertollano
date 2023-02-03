const Noticias = require('../../models/Noticias');
const Imagen = require('../../models/Imagen');
const sequelize = require('../ConexionSequelize');
const Noticia = require('../../models/Noticias');
const File = require('./queriesFile');
const Op=require("sequelize");

//Todo Isa
class QueriesNoticias {

    constructor() {
        this.sequelize = sequelize;
    }
    insertarNoticias = async (req, res) => {
        let resultado = 0
        this.sequelize.conectar();
        try {
            if (req.body.imagen.length===0) {
                let noticia = new Noticia();
                noticia.id = null;
                noticia.titulo = req.body.titulo;
                noticia.subtitulo = req.body.subtitulo;
                noticia.contenido = req.body.contenido;
                noticia.seccion = req.body.seccion,
                noticia.save();

            } else {
                let noticia = new Noticia();
                noticia.id = null;
                noticia.titulo = req.body.titulo;
                noticia.subtitulo = req.body.subtitulo;
                noticia.contenido = req.body.contenido;
                noticia.seccion = req.body.seccion,
                noticia.save();
                let imagen= new Imagen();
                imagen.idNoticia=noticia.id;
                imagen.nombre=req.files.name;
                await File.upload(req, res);
            }
            resultado = 1
        } catch (err) {
            throw err;
        }
        this.sequelize.desconectar();
        return resultado;
    }
    getListado = async (seccion) => {
        this.sequelize.conectar();
        const noticias = await Noticias.findAll( 
            {where:{seccion:seccion},
            include:"Imagen",
            order: ['createdAt','id']});
        this.sequelize.desconectar();
        return noticias;
    }
    getNoticia = async (id) => {
        this.sequelize.conectar();
        const noticias = await Noticias.findByPk(id, { include: "Imagen" });
        this.sequelize.desconectar();
        return noticias;
    }

    modificarNoticia = async (id, req, res) => {
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