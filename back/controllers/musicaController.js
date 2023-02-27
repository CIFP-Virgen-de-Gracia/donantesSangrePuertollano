const { response, request } = require('express');
const queriesMusica = require("../database/queries/queriesMusica");
const fs = require('fs');
const path = require('path');

const registrarCancion = async (req, res = response) => {
    queriesMusica.insertarCancion(req).then((cancion) => {
        res.status(200).json(cancion);
    }).catch((err) => {
        console.log(err);
        res.status(203).json("Error de registro");
    });
}
const descargar = async (req, res = response) => {
    queriesMusica.getCancion(req.params.id).then((cancion) => {
        if (cancion) {
            const pathMusic = path.join(__dirname, '../uploads', 'musica', cancion.nombre);
            if (fs.existsSync(pathMusic)) {
                return res.download(pathMusic);
            }
        } else {
            res.status(203).json("Error de descarga");
        }
    }).catch((err) => {
        console.log(err)
        res.status(203).json("No encontrada");
    });
}
const editarCancion = async (req, res = response) => {
    queriesMusica.modificarCancion(req).then((cancion) => {
        res.status(200).json(cancion);
    }).catch((err) => {
        console.log(err)
        res.status(203).json("No se ha podido modificar");
    });
}

const obtenerCancion = async (req, res = response) => {
    console.log(req.params.id);
    queriesMusica.getCancion(req.params.id).then((cancion) => {
        console.log(cancion);
        if (cancion) {
            const pathMusic = path.join(__dirname, '../uploads', 'musica', cancion.nombre);
            if (fs.existsSync(pathMusic)) {
                return res.sendFile(pathMusic);
            }
        } else {
            res.status(203).json("No encontrada");
        }
    }).catch((err) => {
        console.log(err);
        res.status(203).json("No encontrada");
    });
}
const getCancion = async (req, res = response) => {
    queriesMusica.getCancion(req.body.id).then((cancion) => {
        if (cancion !== null) {
            data = {
                "id": cancion.id,
                "nombre": cancion.nombre,
                "titulo":cancion.titulo,
                "letra": cancion.letra,
                "cancion": process.env.URL_PETICION + process.env.PORT + "/api/Musica/upload/" + cancion.id,
                "descarga":process.env.URL_PETICION + process.env.PORT + "/api/Musica/download/" + cancion.id,
            }
            res.status(203).json(data);
        } else {
            res.status(203).json("No encontrada");
        }
    }).catch((err) => {
        console.log(err);
        res.status(203).json("No encontrada");
    });
}
const borrarCancion = async (req, res = response) => {
    queriesMusica.borrarCancion(req.params.id).then((cancion) => {
        console.log(cancion);
        res.status(200).json("La cancion se ha borrado");
    }).catch((err) => {
        console.log(err);
        res.status(200).json("No se ha podido borrar");
    });
}
const Listado = async (req, res = response) => {
    queriesMusica.getListado().then((canciones) => {
        if (canciones !== null) {
            let c = [];
            let data = "";
            canciones.forEach(cancion => {
                data = {
                    "id": cancion.id,
                    "nombre": cancion.nombre,
                    "titulo":cancion.titulo,
                    "letra": cancion.letra,
                    "cancion": process.env.URL_PETICION + process.env.PORT + "/api/Musica/upload/" + cancion.id,
                    "descarga":process.env.URL_PETICION + process.env.PORT + "/api/Musica/download/" + cancion.id,
                }
                c.push(data);
            });
            res.status(200).json(c);
        }
    }).catch((err) => {
        console.log(err);
        res.status(200).json("No encontradas");
    });
}
module.exports = {
    registrarCancion,
    descargar,
    editarCancion,
    obtenerCancion,
    borrarCancion,
    Listado,
    getCancion
}