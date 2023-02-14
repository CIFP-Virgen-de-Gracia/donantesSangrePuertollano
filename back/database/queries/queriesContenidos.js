const sequelize = require('../ConexionSequelize');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');/* 
const Contenido  = require('../../models/Contenido')(sequelize, Sequelize.DataTypes); */
/* const models = require('../../models') */
/* const User = require('../../models/User'); */
const models = require('../../models/index.js');

//Alicia
class QueriesContenidos {

    constructor() {
        this.sequelize = sequelize;
    }


    getHistoria = async () => {/* 
        console.log(prueba) */
        /* try {

            const historia = await Contenido.findOne({
                attributes: ['nombre', 'valor'],
                where: {
                    nombre: 'historia'
                }
            });

            
            return historia;

        } catch (err) {
            console.log(err)
        } */

    }
}


const queriesContenidos = new QueriesContenidos();

module.exports = queriesContenidos;