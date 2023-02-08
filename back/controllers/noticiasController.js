const { response, request } = require('express');
const uploadFile = require("../middlewares/upload");
const queriesNoticias = require("../database/queries/queriesNoticias");
const fs = require('fs');
const path = require('path');

//Todo Isa
const getListado = async (req, res = response) => {
    queriesNoticias.getListado(req.params.seccion).then((noticia) => {
        let not = [];
        noticia.forEach(n => {
            let data;
            let fecha = new Date(n.createdAt).toLocaleString();
            let parrafo = n.contenido.split("\n");
            if (n['Imagen'].length > 0) {
                data = {
                    "id": n.id,
                    "titulo": n.titulo,
                    "subtitulo": n.subtitulo,
                    "contenido": parrafo,
                    "fecha": fecha,
                    "imagen": n["Imagen"][0]['nombre']
                }
            } else {
                data = {
                    "id": n.id,
                    "titulo": n.titulo,
                    "subtitulo": n.subtitulo,
                    "contenido": parrafo,
                    "fecha": fecha,
                    "imagen": n["Imagen"]
                }
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
    queriesNoticias.insertarNoticias(req).then((noticia) => {
        console.log(req.files);
        res.status(200).json(noticia);
    }).catch((err) => {
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
        res.status(200).json("La noticia ha sido borrada");
    }).catch((err) => {
        res.status(200).json("No se ha podido borrar");
    });
}
const mostrarImagen = (req, res = response) => {
    console.log('entro');
    let ruta = "http://127.0.0.1:8090/api/Noticias/upload/" + req.params.nombre;
    queriesNoticias.getImagen(ruta).then((imagen) => {
        if (imagen) {
            pathImagen = path.join(__dirname, '../uploads', 'noticias', req.params.nombre);
            console.log(pathImagen);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }
    }).catch((err) => {
        console.log(err)
        console.log("No se ha encontrado la foto");
    });
}

module.exports = {
    getListado,
    getNoticia,
    registrarNoticia,
    borrarNoticia,
    mostrarImagen
}