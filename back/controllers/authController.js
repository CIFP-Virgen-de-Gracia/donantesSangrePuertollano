const {response,request} = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const enDeCrypt = require('../helpers/crypto');
const generarJWT = require('../helpers/generarJWT');
const mandarCorreo = require('../helpers/mail');

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

const login = (req, res = response) => { // traer y comparar aquí o traer y volver a chocar con la db.

    queriesUsers.getUserLogin(req.body.email, req.body.passwd).then(user => { // get habilities

        const resp = {
            success: true,
            token: generarJWT(user.id, user.nombre, user.iv),
            msg: 'logeado con éxito'
        }

        res.status(200).json(resp);
    }).catch(err => {

        const resp = {
            success: false,
            msg: 'se ha producido un error',
        }

        res.status(401).json(resp);
    });
}

const register = (req, res = response) => { // Preguntar a Fernando (encriptación?)
    queriesUsers.insertUser(req.body.nombre, req.body.email, encrypt(req.body.passwd)).then(resp => {
        
        mandarCorreo(resp.dataValues.id, req.body.email);

        res.status(201).json({success: true, resp: resp});
    }).catch(err => {

        res.status(200).json({success: false, error: err});
    });
}

const activarUsuario = (req, res = response) => {
    
    queriesUsers.insertVerificacionEmail(req.params.id).then(resp => {
        
        console.log('1111111111111111111111');
        console.log(resp);
        res.status(201).json({success: true, resp: resp});
    }).catch(err => {

        console.log('22222222222222222222222');
        console.log(err); 
        
        res.status(200).json({success: false, error: 'se ha producido un error'});
    });
}

module.exports = {
    login,
    register,
    activarUsuario
}

