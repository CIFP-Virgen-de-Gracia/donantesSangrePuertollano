const queriesUsers = require('../database/queries/queriesUsers');
const User = require('../models/User');
const Rol = require('../models/Rol');

const getRoles = (user) => {
    let roles = [];

    for (const rolKey in user.dataValues.RolUser) {
        if (Object.hasOwnProperty.call(user.dataValues.RolUser, rolKey)) {
            const rol = user.dataValues.RolUser[rolKey];
            
            roles.push(rol.dataValues.idRol);
        }
    }

    return roles;
}


const getHabilites = async(id) => {   
    const user = await queriesUsers.getUser(id);

    console.log(user);

    const roles = getRoles(user);
    const habilities = await queriesUsers.getAbilities(roles);

    console.log(habilities);
}

getHabilites(1);