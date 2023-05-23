const { response, request } = require('express');
const queriesUsers = require('../database/queries/queriesUsers');


const updateUser = (req, res = response) => {

    try {

        console.log(req.body);
        const infoUser = {...req.body};
        delete infoUser.id;

        const resp = queriesUsers.updateUser(req.body.id, infoUser);

        res.status(201).json({success: true, msg: 'actualizado con éxito'});
    }
    catch (err) {

        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}

module.exports = {
    updateUser
}