const { response, request } = require('express');
const uploadFile = require("../middlewares/upload");
const queriesNoticias = require("../database/queries/queriesNoticias");
const fs = require('fs');
const path = require('path');
const queriesFile = require("../database/queries/queriesFile");

//Todo Isa
const getListado = async (req, res = response) => {
    queriesNoticias.getListado(req.params.seccion).then((noticia) => {
        let not = [];
        noticia.forEach(n => {
            let parrafo = n.contenido.split("\n");
            let data = {
                "id": n.id,
                "titulo": n.titulo,
                "subtitulo": n.subtitulo,
                "contenido": parrafo,
                "fecha": n.createdAt,
                "imagen":n["Imagen"]
            }
            not.push(data);
        });
        res.status(200).json(not);
    }).catch((err) => {
        console.log(err);
        res.status(200).json("No encontrada");
    });
}
const registrarNoticia = async (req, res = response) => {
    console.log(req.body);
    queriesNoticias.insertarNoticias(req, res).then((noticia) => {
        res.status(200).json(noticia);
    }).catch((err) => {
        console.log(err);
        res.status(203).json("Error de registro");
    });
}
const getNoticia = (req, res = response) => {
    queriesNoticias.getNoticia(req.body.id).then((noticia) => {
        res.status(200).json(noticia);
    }).catch((err) => {
        res.status(200).json("No encontrada");
    });
}
const borrarNoticia = (req, res = response) => {
    queriesNoticias.borrarNoticias(req.body.id).then((noticia) => {
        console.log('Noticia borrada');
        res.status(200).json(noticia);
    }).catch((err) => {
        console.log("Noticia no encontrada");
        res.status(200).json("No se ha podido borrar");
    });
}

module.exports = {
    getListado,
    getNoticia,
    registrarNoticia,
    borrarNoticia,
}