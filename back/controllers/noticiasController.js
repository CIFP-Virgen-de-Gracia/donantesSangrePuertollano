const { response, request } = require('express');
const queriesNoticias = require("../database/queries/queriesNoticias");
const fs = require('fs');
const path = require('path');

//Todo Isa
const getListado = async (req, res = response) => {
    queriesNoticias.getListado(req.params.seccion).then((noticia) => {
        if (noticia !== null) {
            let not = [];
            noticia.forEach(n => {
                let data;
                let fecha = new Date(n.createdAt).toLocaleString();
                if (n['Imagen'].length > 0) {
                    data = {
                        "id": n.id,
                        "titulo": n.titulo,
                        "subtitulo": n.subtitulo,
                        "contenido": n.contenido,
                        "seccion":n.seccion,
                        "fecha": fecha,
                        "imagen":  process.env.URL_PETICION + process.env.PORT + "/api/noticias/upload/" + n["Imagen"][0]["id"],
                    }
                } else {
                    data = {
                        "id": n.id,
                        "titulo": n.titulo,
                        "subtitulo": n.subtitulo,
                        "contenido": n.contenido,
                        "seccion":n.seccion,
                        "fecha": fecha,
                        "imagen": ""
                    }
                }
                not.push(data);
            });
            res.status(200).json(not);
        }
    }).catch((err) => {
        console.log(err);
        res.status(200).json("No encontrada");
    });
}


const registrarNoticia = async (req, res = response) => {
    queriesNoticias.insertarNoticias(req).then((noticia) => {
        res.status(200).json(noticia);

    }).catch((err) => {
        res.status(203).json("Error de registro");
    });
}


const getNoticia = (req, res = response) => {
    queriesNoticias.getNoticia(req.body.id).then((noticia) => {
        if (noticia !== null) {
            if (noticia["Imagen"].length > 0) {
                data = {
                    "id": noticia.dataValues.id,
                    "titulo": noticia.dataValues.titulo,
                    "subtitulo": noticia.dataValues.subtitulo,
                    "contenido": noticia.dataValues.contenido,
                    "seccion": noticia.dataValues.seccion,
                    "imagen": process.env.URL_PETICION + process.env.PORT + "/api/noticias/upload/" + noticia.dataValues.Imagen[0]["id"]
                }
            } else {
                data = {
                    "id": noticia.dataValues.id,
                    "titulo": noticia.dataValues.titulo,
                    "subtitulo": noticia.dataValues.subtitulo,
                    "contenido": noticia.dataValues.contenido,
                    "seccion": noticia.dataValues.seccion,
                    "imagen": ""
                }
            }
            res.status(200).json(data);
        } else {
            res.status(200).json("No encontrada");
        }
    }).catch((err) => {
        res.status(200).json("No encontrada");
    });
}


const borrarNoticia = (req, res = response) => {
    queriesNoticias.borrarNoticia(req.params.id).then((noticia) => {
        res.status(200).json("La noticia ha sido borrada");

    }).catch((err) => {
        res.status(200).json("No se ha podido borrar");
    });
}


const modificarNoticia = (req, res = response) => {
    queriesNoticias.modificarNoticia(req).then((noticia) => {
        res.status(200).json(noticia);

    }).catch((err) => {
        res.status(203).json("No se ha podido modificar");
    });
}


const mostrarImagen = (req, res = response) => {
    queriesNoticias.getImagen(req.params.id).then(imagen => {
        if (imagen) {
            const pathImagen = path.join(__dirname, '../uploads', 'noticias', imagen.nombre);

            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }
    }).catch((err) => {
        console.log("No se ha encontrado la foto");
    });
}



module.exports = {
    getListado,
    getNoticia,
    registrarNoticia,
    borrarNoticia,
    modificarNoticia,
    mostrarImagen
}