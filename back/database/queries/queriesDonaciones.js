const { Sequelize } = require('sequelize');
const models = require('../../models/index.js');


const getDonaciones = async() => {
    const resp = await models.Donacion.findAll({
        order: [['fecha', 'DESC']]
    });
    
    return resp;
}


const getTiposDonacion = async() => {  
    const resp = await models.Cita.findAll({
        attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('donacion')) ,'donacion']]
    });
    
    return resp;
}


module.exports = {
    getDonaciones,
    getTiposDonacion
};