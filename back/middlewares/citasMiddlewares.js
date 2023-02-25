const queriesCitas = require('../database/queries/queriesCitas');
const {response,request} = require('express');

const hayCapacidad = async(req, res, next) => {

    const numCitas = await queriesCitas.getNumCitasHora(req.body.fecha);
    
    if (numCitas < 2) {next();}
    else {

        return res.status(200).json({success: false, msg: 'no hay espacio'});
    }
}

module.exports = {
    hayCapacidad
}