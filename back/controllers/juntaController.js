const { response } = require('express');
const queriesJunta = require("../database/queries/queriesJunta");
require('dotenv').config();


//Alicia
const getIntegrantesCargo = (req, res = response) => {
    queriesJunta.getCargoIntegrantes()
        .then(listadoJunta => {
            /* listadoJunta.forEach(integrante => {
               let i = {

               }
            });
            const resp = {
                success: true,
                data: {
                    id: user.id,
                    nombre: user.nombre,
                    token: generarJWT(user.id),
                },
                msg: 'Registros encontrados'
            } */

            res.status(200).json(listadoJunta);

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

