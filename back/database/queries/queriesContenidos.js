const {Op} = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../ConexionSequelize');
const models = require('../../models/index.js');
/* process.setMaxListeners(0); */
//Alicia
class QueriesContenidos {

    constructor() {
        this.sequelize = sequelize;
    }


    getHistoria = async () => {

        const historia = await models.Contenido.findOne({
            attributes: ['id', 'nombre', 'valor'],
            where: {
                nombre: 'historia'
            }
        });

        return historia;
    }


    getCargosJunta = async () => {

        const cargos = await models.CargoJunta.findAll();

        return cargos;
    }


    getCargoIntegrantes = async () => {
        //https://stackoverflow.com/questions/68132680/how-to-return-values-from-joined-tables-in-sequelize-at-the-same-level-as-master
        const cargosIntegrantes = await models.IntegranteJunta.findAll({

            include: [
                {
                    model: models.CargoIntegrante,
                    attributes: [],
                    as: 'CargoIntegrante',
                    include: [
                        {
                            model: models.CargoJunta,
                            attributes: [],
                            as: 'CargoJunta'
                        }
                    ]
                }
            ],
            attributes: ['id', 'nombre', [Sequelize.col('CargoIntegrante.CargoJunta.nombre'), 'cargo'], [Sequelize.col('CargoIntegrante.CargoJunta.id'), 'idCargo']]
        });

        return cargosIntegrantes;
    }


    updateHistoria = async (valor) => {

        try {
            this.sequelize.conectar();

            const historia = await models.Contenido.findOne({
                where: {
                    nombre: 'historia',
                }
            });

            historia.update({ valor: valor })
            const resp = await historia.save();

            this.sequelize.desconectar();
            return resp;

        } catch (err) {
            throw err;
        }
    }


    updateNombreIntegranteJunta = async (integrante) => {
        try {
            this.sequelize.conectar();

            const int = await models.IntegranteJunta.findByPk(integrante.id);
            int.update({ nombre: integrante.nombre });
            const respInt = await int.save();

            this.sequelize.desconectar();

            return respInt;

        } catch (err) {
            throw err;
        }
    }


    updateCargoIntegranteJunta = async (integrante) => {
        try {
            this.sequelize.conectar();

            const idCargo = await models.CargoJunta.findOne({
                attributes: ['id'],
                where: {
                    nombre: integrante.cargo
                }
            });

            const cargoInt = await models.CargoIntegrante.findOne({
                attributes: ['idCargo', 'idIntegrante'],
                where: {
                    idIntegrante: integrante.id
                }
            });
          
            cargoInt.update({ idCargo: idCargo.id });
            const respCargo = await cargoInt.save();
            
            this.sequelize.desconectar();

            return respCargo;

        } catch (err) {
            throw err;
        }
    }
}



const queriesContenidos = new QueriesContenidos();

module.exports = queriesContenidos;