const { response, request } = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const correos = require('../helpers/mail');

//Todo Alicia
const suscripcionNewsletter = async (req, res = response) => {

    try {

        let resp = await queriesUsers.getEmail(req.body.email);

        if (resp == null) {
            resp = await queriesUsers.insertEmailNewsletter(req.body.email);
        }

        if (resp.dataValues.newsletterVerifiedAt != null) {
            res.status(200).json({ success: false, msg: 'Ya estás suscrito' });
            
        } else {
            correos.mandarCorreoActivacion(resp.dataValues.id, req.body.email, 'activarNewsletter')
            res.status(201).json({ success: true, msg: 'Enviado con éxito' });
        }

    } catch (error) {
        res.status(200).json({ success: false, msg: 'Se ha producido un error' });
    }
}


module.exports = {
    suscripcionNewsletter
}

