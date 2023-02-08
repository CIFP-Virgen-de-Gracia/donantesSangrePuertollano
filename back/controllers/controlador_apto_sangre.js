const {response, request} = require('express');
const query_Apto_Sangre = require('../database/queries/query_Apto_Sangre');
//Todo Alejandro
const mostrarPreguntas = (req = request, res = response) => {
    const conx = new query_Apto_Sangre();
    conx.getPreguntas()
    .then( msg => {
        res.status(200).json(msg);
    });
}

const mostrarPregunta = (req = request, res = response) => {
    const conx = new query_Apto_Sangre();
    conx.getPregunta(req.params.id)
    .then( msg => {
        res.status(200).json(msg);
    });
}

const generarPregunta = (req = request, res = response) => {
    const conx = new query_Apto_Sangre();
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