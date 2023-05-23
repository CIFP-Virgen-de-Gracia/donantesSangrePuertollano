const { response, request } = require('express');
const queriesDonaciones = require('../database/queries/queriesDonaciones');
const queriesAltas = require('../database/queries/queriesAltas');
const moment = require('moment');

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



const getAltas = async(req, res = response) => {
    queriesAltas.getAltas()
        .then(altas => {

            const resp = {
                success: true,
                data: altas
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


const insertDonacion = async(req, res = response) => { 
    req.body.fecha = moment(req.body.fecha, 'YYYY-MM-DD').add(2, 'hour');

    queriesDonaciones.insertDonacion(req.body)
        .then(donacion => {

            const resp = {
                success: true,
                msg: 'Donación registrada con éxito'
            }

            res.status(200).json(resp);

        }).catch(err => {
            
            const resp = {
                success: false,
                msg: 'Se ha producido un error',
            }

            res.status(200).json(resp);
        });
}


const insertAltas = async(req, res = response) => { 
    req.body.fecha = moment(req.body.fecha, 'YYYY-MM-DD').add(2, 'hour');
    const promesas = [];

    for (let i = 0; i < req.body.altas; i++) {
        promesas.push(() => queriesAltas.insertAltas(req.body));
    }

    try {
        const promesasResp = await Promise.all(promesas.map(p => p()));

        const resp = {
            success: true,
            msg: 'Altas registradas con éxito'
        }

        res.status(200).json(resp);

    } catch(err) {
            
        const resp = {
            success: false,
            msg: 'Se ha producido un error',
        }

        res.status(200).json(resp);
    }    
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
    getAltas,
    insertDonacion,
    insertAltas,
    getTiposDonacion
}