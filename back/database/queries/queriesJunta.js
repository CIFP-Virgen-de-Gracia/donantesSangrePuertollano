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
            attributes: ['nombre', 'apellido1', 'apellido2', [Sequelize.col('cargoIntegrante.cargoJunta.nombre'), 'nombreCargo']]
        });



        /*  `Select integrantesjunta.nombre, apellido1, apellido2, cargosjunta.nombre 
        from integrantesjunta join cargointegrantes
        on integrantesjunta.id = cargointegrantes.idIntegrante 
        join cargosjunta 
        on cargosjunta.id = cargointegrantes.idCargo`*/

        /* 
                await UsersDb.models.order.findOne({ 
                    where: { id: 1 }, 
                    include: [ProductsDb.models.product] 
                  });
         */
        console.log(cargosIntegrantes)
        return cargosIntegrantes
    }
}

const queriesJunta = new QueriesJunta();

module.exports = queriesJunta;