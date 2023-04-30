const { response, request } = require('express');
const queriesChat = require("../database/queries/queries-chat");


const Listado = async (req, res = response) => {
    queriesChat.getListado().then((mensajes) => {
        res.status(200).json({
            success: true,
            data: mensajes,
            msg: 'Mensajes obtenidos'
        });
    }).catch((err) => {
        console.log(err);
        res.status(203).json({
            success: false,
            data: null,
            msg: 'No se han podido obtener'
        });
    });
}


const borrarMensajes = async (req, res = response) => {
    queriesChat.borrarTodo().then((mensaje) => {
        res.status(200).json({
            success: true,
            data: mensaje,
            msg: 'Mensaje borrados'
        });
    }).catch((err) => {
        console.log(err);
        res.status(203).json({
            success: false,
            data: null,
            msg: 'No se han podido borrar'
        });
    });
}


module.exports = {
    Listado,
    borrarMensajes,
}