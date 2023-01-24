const {response,request} = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const crypto = require('crypto');


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

const login = (req, res = response) => {
    queriesUsers.getUserLogin(req.body.email, req.body.passwd).then(user => {
        let userResp = {...user.dataValues};

        delete userResp.RolUser; delete userResp.emailVerifiedAt; 
        delete userResp.createdAt; delete userResp.updatedAt;
        
        userResp.roles = getRoles(user);

        const resp = {
            success: true,
            user: userResp,
            msg: 'logeado con éxito'
        }

        res.status(200).json(resp);
    }).catch(err => {

        const resp = {
            success: false,
            error: err,
            msg: 'operación fallida'
        }

        res.status(401).json(resp);
    });
}

const register = (req, res = response) => {
    queriesUsers.insertUser(req.body.nombre, req.body.email, req.body.passwd).then(resp => {

    });


}

module.exports = {
    login,
    register
}

