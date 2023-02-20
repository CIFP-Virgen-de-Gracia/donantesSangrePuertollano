const { response, request } = require('express');
const queriesNoticias = require("../database/queries/queriesNoticias");
const fs = require('fs');
const path = require('path');
const queriesUsers = require('../database/queries/queriesUsers');
const correo = require('../helpers/mail');

//Isa
const getListado = async (req, res = response) => {
    queriesNoticias.getListado(req.params.seccion).then((noticia) => {
        if (noticia !== null) {
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
                        "imagen": "http://127.0.0.1:8090/api/Noticias/upload/" + n.id,
                    }
                } else {
                    data = {
                        "id": n.id,
                        "titulo": n.titulo,
                        "subtitulo": n.subtitulo,
                        "contenido": parrafo,
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

//Isa
const registrarNoticia = async (req, res = response) => {
    const emails = await queriesUsers.getSuscritosNewsletter(); //Alicia

    queriesNoticias.insertarNoticias(req).then((noticia) => {
        
        contenido = {
            asunto: 'Nueva noticia publicada',
            cuerpoHtml: `<small>${ noticia.fecha }</small><h1>${ noticia.titulo }</h1><h2>${ noticia.subtitulo }</h2><p>${ noticia.parrafo }</p>` 
        } //Alicia
        emails.map(e => correo.mandarCorreo(e, contenido) );//Alicia

        res.status(200).json(noticia);

    }).catch((err) => {
        console.log(err)
        res.status(203).json("Error de registro");
    });
}

//Isa
const getNoticia = (req, res = response) => {
    queriesNoticias.getNoticia(req.body.id).then((noticia) => {
        if (noticia !== null) {
            if (noticia['Imagen'].length > 0) {
                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "seccion": noticia.seccion,
                    "imagen": "http://127.0.0.1:8090/api/Noticias/upload/" + noticia.id,
                }
            } else {
                data = {
                    "id": noticia.id,
                    "titulo": noticia.titulo,
                    "subtitulo": noticia.subtitulo,
                    "contenido": noticia.contenido,
                    "seccion": noticia.seccion,
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

//Isa
const borrarNoticia = (req, res = response) => {
    queriesNoticias.borrarNoticia(req.params.id).then((noticia) => {
        console.log(noticia);
        res.status(200).json("La noticia ha sido borrada");
    }).catch((err) => {
        console.log(err);
        res.status(200).json("No se ha podido borrar");
    });
}

//Isa
const modificarNoticia = (req, res = response) => {
    queriesNoticias.modificarNoticia(req).then((noticia) => {
        res.status(200).json(noticia);
    }).catch((err) => {
        console.log(err)
        res.status(203).json("No se ha podido modificar");
    });
}

//Isa
const mostrarImagen = (req, res = response) => {
    queriesNoticias.getImagen(req.params.id).then((imagen) => {
        if (imagen) {
            const pathImagen = path.join(__dirname, '../uploads', 'noticias', imagen.nombre);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
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
    modificarNoticia,
    mostrarImagen
}