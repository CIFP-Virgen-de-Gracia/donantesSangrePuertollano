const { response, request } = require('express');
const { Cita } = require('../models/Cita');
const email = require('../helpers/mail');
const queriesCitas = require('../database/queries/queriesCitas');
const moment = require('moment');
const sequelize = require('../database/ConexionSequelize');
const queriesUsers = require('../database/queries/queriesUsers');
const metodosFecha = require('../helpers/fechas');
const { QueryInterface } = require('sequelize');
const qr = require('../helpers/qr-code');
const fs = require('fs');

//TODO: hacer una tabla de parametrización en db en principio para el n de pacientes que pueden atender en una misma hora

// todo Mario
const pedirCita = async(req, res = response) => {
    try {

        if (metodosFecha.horaEsMayor(req.body.fecha, moment().format('YYYY-MM-DD HH:mm:ss')) 
                && metodosFecha.horaValida(req.body.fecha)) {
                    const cita = {
                        fecha: moment(req.body.fecha, 'YYYY-MM-DD HH:mm:ss').add(1, 'hour'),
                        userId: req.body.id,
                        donacion: req.body.donacion
                    }
            
                    const resp = await queriesCitas.insertCita(cita);
            
                    mandarCorreoFechaCita(cita.userId, cita.fecha, cita.donacion, resp.id);
                    
                    res.status(200).json({success: true, msg: 'cita insertada con éxito'});
            }
        else {

            res.status(200).json({success: false, msg: 'fecha no válida'});
        }
        
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

                if (arrayHorasReservadas.filter(h => (h == hora)).length < 2) horasDisponibles.push(hora); // explicación justo arriba (*)
            }


            res.status(200).json({success: true, horas: horasDisponibles});
        }).catch(err => {

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


const yaHaPedidoUnaCita = async(req, res = response) => {

    const nUser = await queriesCitas.getNumCitasPendientesUser(req.params.id);
    if (nUser < 1) {
        
        return res.status(200).json({success: true, msg: 'no has pedido cita'});
    }
    else {

        return res.status(200).json({success: false, msg: 'ya has pedido cita'});
    }
}


const mandarCorreoFechaCita = async(id, fecha, donacion, idCita) => {

    const dia = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY');
    const hora = moment(fecha, 'YYYY-MM-DD HH:mm:ss').format('HH:mm');
    let imagenQr = await qr.generarQr(id,idCita); 
    console.log(imagenQr);
    let contenido = {};

    contenido.asunto = 'Recordatorio de tu cita.';

    contenido.cuerpoHtml = `
        Hola. Recuerda que el día <strong>${(metodosFecha.colocarFecha(dia))}</strong> a las 
        <strong>${(metodosFecha.colocarHora(hora))}</strong> tienes una cita para donar <strong>${(donacion)}</strong>.
        Se le ha adjuntado un código qr que debera mostrar cuando sea atendido para confirmar su asistencia a la cita.
    `;


    const correo = await queriesUsers.getEmailById(id);
    const resp = email.mandarCorreoAttachment(correo.email, contenido,imagenQr);

   //Elimino la imagen generada para evitar que surjan problemas de rendimiento y almacenamiento
    if (fs.existsSync(imagenQr)){
        fs.unlinkSync(imagenQr);
    }
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
    userNoTieneCita,
    yaHaPedidoUnaCita
}