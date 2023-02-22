require('dotenv').config();
const queriesUsers = require('../database/queries/queriesUsers');
const userCan = require('../helpers/rolesAbilities');
const { response, request } = require('express');


const midAdmin = async (req, res, next) => {
    const abilities = queriesUsers.getAbilities('admin');

    if (await userCan(req, req.idToken, abilities)) {
        next();                                                      
    } else {
        return res.status(403).json({ msg: 'No estás autorizado' });
    }
}


const midUser = async (req, res, next) => {
    const abilities = queriesUsers.getAbilities('user');

    if (await userCan(req, req.idToken, abilities)) {
        next();                                                      
    } else {
        return res.status(403).json({ msg: 'No estás autorizado' });
    }
}

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
    midAdmin,
    midUser
}