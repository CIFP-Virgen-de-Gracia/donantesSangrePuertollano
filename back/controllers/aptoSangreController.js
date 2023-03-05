const {response, request} = require('express');
const queriesAptoSangre = require('../database/queries/queriesAptoSangre');
//Todo Alejandro
const mostrarPreguntas = (req = request, res = response) => {
    const conx = new queriesAptoSangre();
    conx.getPreguntas()
    .then( msg => {
        res.status(200).json(msg);
    });
}

const mostrarPregunta = (req = request, res = response) => {
    const conx = new queriesAptoSangre();
    conx.getPregunta(req.params.id)
    .then( msg => {
        res.status(200).json(msg);
    });
}

const generarPregunta = (req = request, res = response) => {
    const conx = new queriesAptoSangre();
    conx.generarPregunta(req.body.enunciado, req.body.nombre_imagen, req.body.respuesta, req.body.solucion_problema)
    .then( msg => {
        res.status(201).json(msg);
    });
}

module.exports = {
    mostrarPreguntas,
    mostrarPregunta,
    generarPregunta
}