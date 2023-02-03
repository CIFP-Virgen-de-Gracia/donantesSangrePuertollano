const { response, request } = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const correos = require('../helpers/mail');


const suscripcionNewsletter = async (req, res = response) => {

    try {

        let resp = await queriesUsers.getIdByEmail(req.body.email);

        if (resp == null) {
            resp = await queriesUsers.insertEmail(req.body.email);  
        }

        correos.mandarCorreoActivacion(resp.id, req.body.email, 'activarNewsletter')
        res.status(201).json({ success: true, msg: 'Enviado con éxito' });

    } catch (error) {
        res.status(200).json({ success: false, msg: 'Se ha producido un error' });
    }
}

module.exports = {
    suscripcionNewsletter
}

