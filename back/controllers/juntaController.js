const { response } = require('express');
const queriesJunta = require("../database/queries/queriesJunta");
require('dotenv').config();


//Alicia
const getIntegrantesCargo = (req, res = response) => {
    queriesJunta.getCargoIntegrantes()
        .then(listadoJunta => {
            
            const resp = {
                success: true,
                data: listadoJunta
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
    getIntegrantesCargo
}

