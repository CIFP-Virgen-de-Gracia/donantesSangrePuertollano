const moment = require('moment');
const { response, request } = require('express');
const metodosFecha = require('../helpers/fechas');
const sequelize = require('../database/ConexionSequelize');
const queriesCitas = require('../database/queries/queriesCitas');


const getDonaciones = async(req, res = response) => {
    queriesCitas.getCitasAsistidas()
        .then(citas => {

            const resp = {
                success: true,
                data: citas
            }

            res.status(200).json(resp);

        }).catch(err => {
            
            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(203).json(resp);
        });
}


const getTiposDonacion = async(req, res = response) => {
    queriesCitas.getTiposDonacion()
        .then(donaciones => {

            const resp = {
                success: true,
                data: donaciones
            }

            res.status(200).json(resp);

        }).catch(err => {
            
            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(203).json(resp);
        });
}

module.exports = {
    getDonaciones,
    getTiposDonacion
}