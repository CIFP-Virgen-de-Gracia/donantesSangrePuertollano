const sequelize = require('../ConexionSequelize');
const { Op } = require('sequelize');
const CargoIntegrante = require('../../models/JuntaRectora/CargoIntegrante');
const IntegranteJunta = require('../../models/JuntaRectora/IntegranteJunta');
const CargoJunta = require('../../models/JuntaRectora/CargoJunta');
const models = require('../../models/JuntaRectora');

const Sequelize = require('sequelize');

//Alicia
class QueriesJunta {

    constructor() {
        this.sequelize = sequelize;
    }


    getCargoIntegrantes = async () => {
        //https://stackoverflow.com/questions/68132680/how-to-return-values-from-joined-tables-in-sequelize-at-the-same-level-as-master
        const cargosIntegrantes = await models.db.models.integranteJunta.findAll({
            
            include: [
                { model: models.db.models.cargoIntegrante,
                    attributes: [],
                    as: 'cargoIntegrante',
                    include: [
                        { model: models.db.models.cargoJunta,
                            attributes: [],
                        as: 'cargoJunta'}
                    ]
                }
            ],
            attributes: ['nombre', 'apellido1', 'apellido2', 
                        [Sequelize.col('cargoIntegrante.cargoJunta.nombre'), 'cargo']]
        });

        return cargosIntegrantes;
    }
}


const queriesJunta = new QueriesJunta();

module.exports = queriesJunta;