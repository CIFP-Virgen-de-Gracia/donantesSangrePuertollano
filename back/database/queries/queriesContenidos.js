const sequelize = require('../ConexionSequelize');
const models = require('../../models/index.js');

//Alicia
class QueriesContenidos {

    constructor() {
        this.sequelize = sequelize;
    }


    getHistoria = async () => {
        
        const historia = await models.Contenido.findOne({
            attributes: ['nombre', 'valor'],
            where: {
                nombre: 'historia'
            }
        });

        return historia;
    }
}


const queriesContenidos = new QueriesContenidos();

module.exports = queriesContenidos;