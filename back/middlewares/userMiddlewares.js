require('dotenv').config();
const queriesUsers = require('../database/queries/queriesUsers');
const getAbilites = require('../helpers/rolesAbilities');
const userCan = require('../helpers/rolesAbilities');
const {response,request} = require('express');

// MIDDLEWARE DE EJEMPLO PARA CHECKEAR LAS ABILITES

// const midEjemplo = async(req, res, next) => {
//     if (await userCan(req, req.idToken, ['ability1', 'ability2'])) { // hay que pasarle el objeto req.
//         next();                                                      // las abilities que queremos comprobar si
//     }                                                                // tiene hay que pasarlas en un array.
//     else {
//         return res.status(403).json({
//             msg: 'No estás autorizado'
//         });
//     }
// }

module.exports = {
    
}