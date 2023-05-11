const models = require('../../models/index.js');


const getAltas = async() => {
    const resp = await models.Alta.findAll({
        order: [['fecha', 'DESC']]
    });
    
    return resp;
}


module.exports = {
    getAltas
};