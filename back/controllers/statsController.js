const { response, request } = require('express');
const { Cita } = require('../models/Cita');
const queriesCitas = require('../database/queries/queriesCitas');
const sequelize = require('../database/ConexionSequelize');
const metodosFecha = require('../helpers/fechas');


const getPorTiempo = async(req, res = response) => {
    
}


module.exports = {
    getPorTiempo
}