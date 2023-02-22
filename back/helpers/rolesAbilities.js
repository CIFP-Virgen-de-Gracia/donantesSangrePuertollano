const queriesUsers = require('../database/queries/queriesUsers');
const User = require('../models/User');
const Rol = require('../models/Rol');
const sequelize = require('../database/ConexionSequelize');

//Todo Mario
const getArrayRoles = (user) => {
    let roles = [];

    for (const rolKey in user.RolUser) {
        if (Object.hasOwnProperty.call(user.RolUser, rolKey)) {
            const rol = user.RolUser[rolKey];
            
            roles.push(rol.idRol);
        }
    }

    return roles;
}


const userCan = async(req, id, acciones) => { 
    let arrayAbilities = [];

    if (req.userAbilites) {
        arrayAbilities = req.userAbilites;
    }
    else {
        const user = await queriesUsers.getUserRoles(id);
        const roles = getArrayRoles(user);
        const abilities = await queriesUsers.getAbilities(roles);

        abilities.forEach(ability => {
            arrayAbilities = Array.from(new Set([...arrayAbilities, ...ability.dataValues.abilities.split(' ')]));
        });
        
        req.userAbilites = arrayAbilities;
    }

    let autorizado = true;

    acciones.forEach(accion => {
        if (!arrayAbilities.includes(accion)) {
            autorizado = false;
            
            return // es un bucle sencillo. Simplemente vuelvo cuando compruebo que no incluye una de las abilites requeridas.
        } 
    });

    return autorizado;
}

module.exports = userCan;

