const { response, request } = require('express');
const queriesContenidos = require('../database/queries/queriesContenidos');

//Alicia
const getHistoria = async (req, res = response) => {
    queriesContenidos.getHistoria()
        .then(historia => {
            
            const resp = {
                success: true,
                data: historia.dataValues
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


module.exports = {
    getHistoria
}