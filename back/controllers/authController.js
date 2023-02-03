const { response, request } = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
// const enDeCrypt = require('../helpers/crypto');
const generarJWT = require('../helpers/generarJWT');
const mandarCorreoActivacion = require('../helpers/mail');

const login = (req, res = response) => { // traer y comparar aquí o traer y volver a chocar con la db.
    
    queriesUsers.getUserLogin(req.body.email).then(user => { // get habilities

        let resp = null;

        if (req.body.passwd == user.passwd) {
            resp = {
                success: true,
                token: generarJWT(user.id, user.nombre),
                msg: 'logeado con éxito'
            }
        }
        else {
            resp = {
                success: false,
                msg: 'fallo en la autenticación'
            }
        }

        res.status(200).json(resp);
    }).catch(err => {

        const resp = {
            success: false,
            msg: 'se ha producido un error',
        }

        res.status(200).json(resp);
    });
}

const register = (req, res = response) => {
    queriesUsers.insertUser(req.body.nombre, req.body.email, req.body.passwd).then(resp => {

        mandarCorreoActivacion(resp.id, req.body.email);
        res.status(201).json({ success: true, msg: 'Registrado con éxito' });
    }).catch(err => {

        res.status(200).json({ success: false, msg: 'Se ha producido un error' });
    });
}

const activarCorreo = (req, res = response) => {
    queriesUsers.updateVerificacionEmail(req.params.id)
        .then(resp => {

            res.status(201).json({ success: true, resp: resp });
        }).catch(err => {

            res.status(200).json({ success: false, error: 'Se ha producido un error' });
        });
}


const activarNewsletter = (req, res = response) => {
    queriesUsers.updateVerificacionEmailNewsletter(req.params.id)
        .then(resp => {

            res.status(201).json({ success: true, resp: resp });
        }).catch(err => {

            res.status(200).json({ success: false, error: 'Se ha producido un error' });
        });
}

module.exports = {
    login,
    register,
    activarCorreo,
    activarNewsletter
}

