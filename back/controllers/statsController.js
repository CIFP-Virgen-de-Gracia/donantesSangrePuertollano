const { response, request } = require('express');
const queriesDonaciones = require('../database/queries/queriesDonaciones');


const getDonaciones = async(req, res = response) => {
    queriesDonaciones.getDonaciones()
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



const getNumAltas = async(req, res = response) => {
    res.status(200).json({
        success: true,
        data: 435
    });
    /* queriesDonaciones.getDonaciones()
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
        }); */
}


const getTiposDonacion = async(req, res = response) => {
    queriesDonaciones.getTiposDonacion()
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
    getNumAltas,
    getTiposDonacion
}