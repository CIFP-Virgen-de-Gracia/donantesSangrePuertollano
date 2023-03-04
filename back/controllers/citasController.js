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
            fecha: moment(req.body.fecha, 'YYYY-MM-DD HH:mm:ss').add(1, 'hour'),
            userId: req.body.id,
            donacion: req.body.donacion
        }

        const resp = await queriesCitas.insertCita(cita);

        mandarCorreoFechaCita(cita.userId, cita.fecha, cita.donacion);
        
        res.status(200).json({success: true, msg: 'cita insertada con éxito'});
    }
    catch (err) {

        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}


const cancelarCita = async(req, res = response) => {
    try {
        const resp = await queriesCitas.cancelarCita(req.body.id);

        res.status(200).json({success: true, msg: 'cita cancelada con éxito'});
    }
    catch (err) {

        console.log(err)
        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}

const getCitaPendienteUser = async(req, res = response) => {
    try {
        const citasUser = await queriesCitas.getCitaPendienteUser(req.params.id);

        res.status(200).json({success: true, citas: citasUser, msg:'cita devuelta con éxito'});
    }
    catch (err) {

        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}


const getCitasPasadasUser = async(req, res = response) => {
    try {
        const citasUser = await queriesCitas.getCitasPasadasUser(req.params.id);
        
        res.status(200).json({success: true, citas: citasUser, msg:'citas devueltas con éxito'});
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

            let horasDisponibles = [];
            for (const hora of arrayHorasHorario) {
                console.log(hora);
                if (arrayHorasReservadas.filter(h => (h == hora)).length < 2) horasDisponibles.push(hora); // explicación justo arriba (*)
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


const mandarCorreoFechaCita = async(id, fecha, donacion) => {

    console.log('1111111111111111111111111111111111111');
    console.log(fecha);
    const dia = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
    const hora = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');

    console.log('2222222222222222222222222222222222222');
    let contenido = {};

    contenido.asunto = 'Recordatorio de tu cita.';

    contenido.cuerpoHtml = `
        Hola. Recuerda que el día <strong>${(metodosFecha.colocarFecha(dia))}</strong> a las 
        <strong>${(metodosFecha.colocarHora(hora))}</strong> tienes una cita para donar <strong>${(donacion)}</strong>.
    `;

    console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf');

    const correo = await queriesUsers.getEmailById(id);
    console.log('asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf');
    console.log(correo)
    const resp = email.mandarCorreo(correo.email, contenido);
}


module.exports = {
    getCitaPendienteUser,
    getCitasPasadasUser,
    cancelarCita,
    pedirCita,
    // getCitasReservadas,
    // getHorarioCitas,
    hayHuecoHora,
    getHorasDisponibles,
    userNoTieneCita
}