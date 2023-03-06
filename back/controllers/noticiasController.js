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
                        "seccion": n.seccion,
                        "fecha": fecha,
                        "imagen": process.env.URL_PETICION + process.env.PORT + "/api/noticias/upload/" + n["Imagen"][0]["id"],
                    }
                } else {
                    data = {
                        "id": n.id,
                        "titulo": n.titulo,
                        "subtitulo": n.subtitulo,
                        "contenido": n.contenido,
                        "seccion": n.seccion,
                        "fecha": fecha,
                        "imagen": ""
                    }
                }
                not.push(data);
            });
            const respuesta = {
                success: true,
                data: not,
                msg: 'Noticias encontradas'
            }

            res.status(200).json(respuesta);
        }
    }).catch((err) => {
        console.log(err);
        const respuesta = {
            success: false,
            data: null,
            msg: 'Noticias no encontradas'
        }
        res.status(200).json(respuesta);
    });
}


const registrarNoticia = async (req, res = response) => {
    queriesNoticias.insertarNoticias(req).then((noticia) => {
        const respuesta = {
            success: true,
            data: noticia,
            msg: 'Noticia registrada'
        }
        res.status(200).json(respuesta);

    }).catch((err) => {
        const respuesta = {
            success: false,
            data: null,
            msg: 'No se ha podido registrar'
        }
        res.status(203).json(respuesta);
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
            const respuesta = {
                success: true,
                data: data,
                msg: 'Noticia encontrada'
            }
            res.status(200).json(respuesta);
        } else {
            const respuesta = {
                success: false,
                msg: 'No se ha encontrado'
            }
            res.status(200).json(respuesta);
        }
    }).catch((err) => {
        const respuesta = {
            success: false,
            data: null,
            msg: 'No se ha encontrado'
        }
        res.status(200).json(respuesta);
    });
}


const borrarNoticia = (req, res = response) => {
    queriesNoticias.borrarNoticia(req.params.id).then((noticia) => {
        const respuesta = {
            success: true,
            data: noticia,
            msg: 'Noticia borrada'
        }
        res.status(200).json(respuesta);

    }).catch((err) => {
        const respuesta = {
            success: false,
            data: null,
            msg: 'No se ha podido borrar'
        }
        res.status(200).json(respuesta);
    });
}


const modificarNoticia = (req, res = response) => {
    queriesNoticias.modificarNoticia(req).then((noticia) => {
        const respuesta = {
            success: true,
            data: noticia,
            msg: 'Noticia editada'
        }
        res.status(200).json(respuesta);
    }).catch((err) => {
        const respuesta = {
            success: false,
            data: null,
            msg: 'No se ha podido modificar'
        }
        res.status(203).json(respuesta);
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
        res.status(200).json("No se ha encontrado");
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