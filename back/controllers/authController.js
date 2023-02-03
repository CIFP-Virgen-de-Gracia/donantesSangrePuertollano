const {response,request} = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
// const enDeCrypt = require('../helpers/crypto');
const generarJWT = require('../helpers/generarJWT');
const mandarCorreo = require('../helpers/mail');
const titleCase = require('title-case');

const login = (req, res = response) => { // traer y comparar aquí o traer y volver a chocar con la db.

    
    queriesUsers.getUserLogin(req.body.email, req.body.passwd).then(user => { // get habilities

        

        const resp = {
            success: true,
            data: {
                id: user.id,
                nombre: user.nombre,
                token: generarJWT(user.id),
            },
            msg: 'logeado con éxito'
        }

        res.status(200).json(resp);
    }).catch(err => {

        const resp = {
            success: false,
            msg: 'fallo en la autenticación',
        }

        res.status(200).json(resp);
    });
}

const register = async(req, res = response) => { // poner código
    const id = await queriesUsers.insertEmail(req.body.email)
        .catch(err => {

            res.status(200).json({success:false, msg: 'usuario ya registrado'})
        });

    queriesUsers.insertUser(id, titleCase.titleCase(req.body.nombre), req.body.passwd).then(resp => {
        
        mandarCorreo(resp.id, req.body.email);
        res.status(201).json({success: true, msg: 'Registrado con éxito'});
    }).catch(err => {

        res.status(200).json({success: false, msg: 'Se ha producido un error'});
    });
}

const activarUsuario = (req, res = response) => {
    queriesUsers.updateVerificacionEmail(req.params.id).then(resp => {
        
        res.status(201).json({success: true, resp: resp});
    }).catch(err => {

        res.status(200).json({success: false, msg: 'Se ha producido un error'});
    });
}

module.exports = {
    login,
    register,
    activarUsuario
}

