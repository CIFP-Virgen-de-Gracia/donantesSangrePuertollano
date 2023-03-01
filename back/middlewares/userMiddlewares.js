require('dotenv').config();
const queriesUsers = require('../database/queries/queriesUsers');
const userCan = require('../helpers/rolesAbilities');
const { response, request } = require('express');


const midAdmin = async (req, res, next) => {
    if (await userCan(req, req.idToken, ['leer', 'editar', 'borrar'])) {
        next();                                                      
    } else {
        return res.status(403).json({ msg: 'No estás autorizado' });
    }
}


const midUser = async (req, res, next) => {
    if (await userCan(req, req.idToken, ['leer'])) {
        next();                                                      
    } else {
        return res.status(403).json({ msg: 'No estás autorizado' });
    }
}

// MIDDLEWARE DE EJEMPLO PARA CHECKEAR LAS ABILITES

 const midAdmin = async(req, res, next) => {
   if (await userCan(req, req.idToken, ['lectura','editado' ,'borrado'])) { // hay que pasarle el objeto req.
      next();                                                      // las abilities que queremos comprobar si
  }                                                                // tiene hay que pasarlas en un array.
     else {
      return res.status(403).json({
        msg: 'No estás autorizado'
      });
    }
 }

module.exports = {
    midAdmin,
    midUser
}