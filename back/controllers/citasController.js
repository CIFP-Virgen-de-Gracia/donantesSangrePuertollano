const { response, request } = require('express');
const { Cita } = require('../models/CitaPendiente');
const email = require('../helpers/mail');
const queriesCitas = require('../database/queries/queriesCitas');
const moment = require('moment');
const sequelize = require('../database/ConexionSequelize');
const queriesUsers = require('../database/queries/queriesUsers');
const colocarFecha = require('../helpers/colocarFecha');
const { QueryInterface } = require('sequelize');


// todo Mario
// const getCitasReservadas = async(req, res = response) => {
//     try {
//         console.log(req.params.fecha);
//         const citas = await queriesCitas.getCitasFechaHora(req.params.fecha);

//         res.status(200).json({success: true, citas: citas});    
//     }
//     catch (err) {

//         res.status(200).json({success: false, msg: 'se ha producido un error'});
//     }
// }


const pedirCita = async(req, res = response) => {
    try {
        const cita = {
            fecha: req.body.fecha,
            userId: req.body.id
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

            console.log('asdfasdf');
            console.log(horasSeg);
            let arrayHorasHorario = [];
            horasSeg.forEach(horaSeg => {
                arrayHorasHorario.push(horaSeg.slice(0,5));
            });

            console.log(horasReservadas);
            let arrayHorasReservadas = [];
            if (horasReservadas.length > 0) {
                horasReservadas.forEach(horaRes => {
                    arrayHorasReservadas.push(horaRes.hora);
                });
            }

            let horasDisponibles = [];
            for (const hora of arrayHorasHorario) {
                if (!arrayHorasReservadas.includes(hora)) horasDisponibles.push(hora);
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


const mandarCorreoFechaCita = async(req, res = response) => {
    try {

        const dia = req.body.fecha.slice(0, 10);
        const hora = req.body.fecha.slice(11);

        let contenido = {};

        contenido.asunto = 'Recordatorio de tu cita.';

        contenido.cuerpoHtml = `
            Hola. Recuerda que el día <strong>${(colocarFecha.colocarFecha(dia))}</strong> a las 
            <strong>${(colocarFecha.colocarHora(hora))}</strong> tienes una cita para donar sangre.
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


// const getCitasPendientes = async(req, res = response) => {
//     try {
//         const citasPendientes = await citas.
//     }
// }

// const marcarCitasPasadas = async() => {  // hago queries directamente por cuestiones de optimización  
//     sequelize.conectar();                // solamente en esta funcionalidad en concreto.

//     let success = true;

//     try {
//         const citas = await Cita.findAll({
//             where: {
//                 fecha: {
//                     [Op.lte]: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
//                 }
//             }
//         });
    
//         citas.forEach(cita => {
//             cita.update({
//                 pasada: 1
//             });
//         });
//     }
//     catch (err) {

//         success = false;
//     }

//     sequelize.desconectar();
//     return success;
// }


module.exports = {
    getCitasUser,
    pedirCita,
    // getCitasReservadas,
    // getHorarioCitas,
    getHorasDisponibles,
    userNoTieneCita,
    mandarCorreoFechaCita
}
