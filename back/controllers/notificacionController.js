const {response, request} = require('express');
const queries_Notificacion = require('../database/queries/queriesNotificacion');
const fs = require('fs');
const path = require('path');
const correo = require('../helpers/mail');
const queriesUsers = require('../database/queries/queriesUsers');

//Todo Alejandro

const getNotificaciones = (req = request, res = response) => {
    
    queries_Notificacion.getNotificaciones()
    .then( msg => {
        res.status(200).json(msg);
    });
}

const getNotificacionUser = (req = request, res = response) => {
    queries_Notificacion.getNotificacionUser(req.params.idUser)
    .then( msg => {
        res.status(200).json(msg);
    });
}

const getCantidadNotificaciones = (req = request, res = response) => {
    queriesUsers.getCantidadNotificaciones(req.body.id)
    .then( msg => {
        res.status(200).json(msg);
    });
}

const postCrearNotificacionesAdministradores = (req = request, res = response) => {
    const idUser = req.body.idUser;
    const idImagenPeticion = req.body.idImagenPeticion;
    let notificaciones = [];
    
    queriesUsers.getAdministradores().then(administradores => {
        administradores.forEach(administrador => {
            queries_Notificacion.postCrearNotificacionesAdministradores(idUser, idImagenPeticion, administrador.id)
            .then( msg => {
                notificaciones.push(msg);
                console.log(notificaciones);
            });
        })
        res.status(201).json({
            success: true,
            datos: "Se han insertado las tablas con exito"
        });
    })
    
}

const postCrearNotificacionAceptarUsuario = (req = request, res = response) => {
    const idUser = req.body.idUser;
    const idImagenPeticion = req.body.idImagenPeticion;
    queries_Notificacion.postCrearNotificacionAceptarUsuario(idUser, idImagenPeticion)
    .then( msg => {
        res.status(201).json(msg);
    });
}

const postCrearNotificacionRechazarUsuario = (req = request, res = response) => {
    const idUser = req.body.idUser;
    const idImagenPeticion = req.body.idImagenPeticion;
    queries_Notificacion.postCrearNotificacionRechazarUsuario(idUser, idImagenPeticion)
    .then( msg => {
        res.status(201).json(msg);
    });
}

const putNotificacionLeida = (req = request, res = response) => {
    const idNotificacion = req.params.idNotificacion;
    queries_Notificacion.putNotificacionLeida(idNotificacion)
    .then( msg => {
        res.status(202).json(msg);
    });
}

const borrarNotificacion = (req = request, res = response) => {
    const idNotificacion = req.params.idNotificacion;
    queries_Notificacion.borrarNotificacion(idNotificacion)
    .then( msg => {
        res.status(202).json(msg);
    });
}

module.exports = {
    getNotificaciones,
    getNotificacionUser,
    getCantidadNotificaciones,
    postCrearNotificacionesAdministradores,
    postCrearNotificacionAceptarUsuario,
    postCrearNotificacionRechazarUsuario,
    putNotificacionLeida,
    borrarNotificacion
}