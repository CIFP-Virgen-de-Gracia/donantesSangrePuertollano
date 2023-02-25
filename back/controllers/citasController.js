const { response, request } = require('express');
const { Cita } = require('../models/Cita');
const email = require('../helpers/mail');
const queriesCitas = require('../database/queries/queriesCitas');
const moment = require('moment');
const sequelize = require('../database/ConexionSequelize');
const queriesUsers = require('../database/queries/queriesUsers');
const metodosFecha = require('../helpers/fechas');
const { QueryInterface } = require('sequelize');

//TODO: hacer una tabla de parametrización en db en principio para el n de pacientes que pueden atender en una misma hora

// todo Mario
const pedirCita = async(req, res = response) => {
    try {
        const cita = {
            fecha: req.body.fecha,
            userId: req.body.id,
            donacion: req.body.donacion
        }

        const resp = await queriesCitas.insertCita(cita);

        res.status(200).json({success: true, msg: 'cita insertada con éxito'});
    }
    catch (err) {

        console.log(err);
        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}


const getCitasUser = async(req, res = response) => {
    try {
        const user = await queriesUsers.getUserCitas(req.params.id);
        
        res.status(200).json({success: true, citas: user.citas});
    }
    catch (err) {

        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}


const getHorasDisponibles = async(req, res = response) => {

    Promise.all([queriesCitas.getHorarioCitas(), queriesCitas.getCitasFechaHora(req.params.fecha)])
        .then(([horasSeg, horasReservadas]) => {

            let arrayHorasHorario = [];
            horasSeg.forEach(horaSeg => {

                // si la hora es después que la actual y es el mismo día o si es otro día (en estos casos las horas
                // comparadas están disponibles)
                if (!moment(req.params.fecha, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM-DD'))
                    || metodosFecha.horaEsMayor(moment(horaSeg, 'HH:mm:ss').format('HH:mm'), moment().format('HH:mm'))
                        && moment(req.params.fecha, 'YYYY-MM-DD').isSame(moment().format('YYYY-MM-DD'))) {
                
                            arrayHorasHorario.push(horaSeg.slice(0,5));
                }
            });

            let arrayHorasReservadas = [];
            if (horasReservadas.length > 0) {
                horasReservadas.forEach(horaRes => {
                    
                    arrayHorasReservadas.push(horaRes.hora);
                });
            }

            console.log(arrayHorasReservadas);

            let horasDisponibles = [];
            for (const hora of arrayHorasHorario) {
                console.log(hora);
                if (arrayHorasReservadas.filter(h => (h == hora)).length < 2) horasDisponibles.push(hora);
            }

            res.status(200).json({success: true, horas: horasDisponibles});
        }).catch(err => {
            console.log(err);
            res.status(200).json({success: false, msg: 'se ha producido un error'});
        });
}


const userNoTieneCita = async(req, res = response) => {
    try {
        const user = await queriesCitas.getCitaPendienteUser(req.params.id);
        
        res.status(200).json({success:false, msg: 'el usuario ya tiene cita'});
    }
    catch (err) {

        res.status(200).json({success: true, msg: 'el usuario no tiene cita'});
    }
}


const hayHuecoHora = async(req, res = response) => {
    try {
        const nUsers = await queriesCitas.getNumUsersFecha(req.params.fecha);

        if (nUsers < 2) {
            res.status(200).json({success: true, msg: 'hay hueco'});
        }
        else {
            res.status(200).json({success: false, msg: 'no hay hueco'});
        }
    }
    catch (err) {

        res.status(500).json({success: false, msg: 'error del servidor'});
    }
}

const mandarCorreoFechaCita = async(req, res = response) => {
    try {

        const dia = req.body.fecha.slice(0, 10);
        const hora = req.body.fecha.slice(11);

        let contenido = {};

        contenido.asunto = 'Recordatorio de tu cita.';

        contenido.cuerpoHtml = `
            Hola. Recuerda que el día <strong>${(metodosFecha.colocarFecha(dia))}</strong> a las 
            <strong>${(metodosFecha.colocarHora(hora))}</strong> tienes una cita para donar sangre.
        `;

        const correo = await queriesUsers.getEmailById(req.body.id);
        const resp = email.mandarCorreo(correo.email, contenido);

        res.status(200).json({success: true, msg: 'Correo enviado correctamente.'});
    }
    catch (err) {

        console.log(err);
        res.status(200).json({success: false, msg: 'Se ha producido un error.'})
    }
}


module.exports = {
    getCitasUser,
    pedirCita,
    // getCitasReservadas,
    // getHorarioCitas,
    hayHuecoHora,
    getHorasDisponibles,
    userNoTieneCita,
    mandarCorreoFechaCita
}

const arr = [2, 3, 1, 3, 4, 5, 3, 1]


console.log(arr.filter(h => (h == 3)).length); 