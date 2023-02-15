const sequelize = require('../ConexionSequelize');
const models = require('../../models/index.js');
const Sequelize = require('sequelize');

//Alicia
class QueriesJunta {

    constructor() {
        this.sequelize = sequelize;
    }


    getCargoIntegrantes = async () => {
        //https://stackoverflow.com/questions/68132680/how-to-return-values-from-joined-tables-in-sequelize-at-the-same-level-as-master
        const cargosIntegrantes = await models.IntegranteJunta.findAll({
            
            include: [
                { model: models.CargoIntegrante,
                    attributes: [],
                    as: 'CargoIntegrante',
                    include: [
                        { model: models.CargoJunta,
                            attributes: [],
                        as: 'CargoJunta'}
                    ]
                }
            ],
            attributes: ['nombre', [Sequelize.col('CargoIntegrante.CargoJunta.nombre'), 'cargo']]
        });

        return cargosIntegrantes;
    }
}


const queriesJunta = new QueriesJunta();

module.exports = queriesJunta;