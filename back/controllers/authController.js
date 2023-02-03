const { response, request } = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
// const enDeCrypt = require('../helpers/crypto');
const generarJWT = require('../helpers/generarJWT');
const email = require('../helpers/mail');
const titleCase = require('title-case');
require('dotenv').config();

//Todo Mario menos activarNewsletter
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


const register = async (req, res = response) => { // poner código
    const id = await queriesUsers.insertEmail(req.body.email)
        .catch(err => {

            res.status(200).json({ success: false, msg: 'usuario ya registrado' })
        });

    queriesUsers.insertUser(id, titleCase.titleCase(req.body.nombre), req.body.passwd).then(resp => {

        email.mandarCorreoActivacion(resp.id, req.body.email, 'activarCorreo');
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

// Alicia
const activarNewsletter = (req, res = response) => {
    const html = `<div style="font-family: Arial, Helvetica, sans-serif;">
                    <h2 style="border-bottom: 0.3rem solid rgb(174, 17, 40);padding-bottom:.5rem;width:fit-content;">
                        ¡Email verificado con éxito!
                    </h2>
                    <p>Recibirás una notificación por correo cada vez que publiquemos una noticia.</p>
                </div>`;

    queriesUsers.updateVerificacionEmailNewsletter(req.params.id)
        .then(resp => {
            res.send(html);
            /* res.status(201).redirect(process.env.INDEX ); *//*  
            res.status(201).json({ success: true, resp: resp }); */
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

