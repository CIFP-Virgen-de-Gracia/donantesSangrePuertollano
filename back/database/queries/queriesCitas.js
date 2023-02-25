const Cita = require('../../models/Cita');
const sequelize = require('../ConexionSequelize');
const conexion = require('../Conexion');
const moment = require('moment');
const {Op, DATE} = require('sequelize');
const HoraCita = require('../../models/HorasCitas');
const User = require('../../models/User');


// todo Mario

const getDataValues = (citas) => {
    citas.forEach(cita => {
        cita = cita.dataValues;
    });

    return citas;
}


const insertCita = async(cita) => {

    console.log('asdfasdfasdf');
    console.log(cita);
    const resp = await Cita.create({
        fecha: cita.fecha,
        userId: cita.userId,
        donacion: cita.donacion
    });

    return resp.dataValues;
}


const getNumCitasHora = async(fecha) => {
    const n = await Cita.count({
        where: {fecha: fecha}
    });

    return n;
}


const getCitasFecha = async(fecha) => { // estos dos métodos son iguales
    const citas = await conexion.query('SELECT citas.fecha, users.nombre FROM citas '
        + 'JOIN users ON citas.userId = users.id '
        + 'WHERE DATE(citas.fecha) = ?;', fecha
    );

    citas.forEach(cita => {
        cita.hora = moment(cita.fecha).format('HH:mm');
    });

    return citas;
}


const getCitasFechaHora = async(fecha) => {
    try {
        
        const citas = await conexion.query('SELECT citas.fecha FROM citas '
            + 'JOIN users ON citas.userId = users.id '
            + 'WHERE DATE(citas.fecha) = ?;', fecha
        );

        citas.forEach(cita => {
            cita.hora = moment(cita.fecha).format('HH:mm');
        });
    
        return citas;
    }
    catch (err) {
        return [];
    }
}


const getHorarioCitas = async() => {
    const horas = await HoraCita.findAll();

    let arrayHoras = [];
    horas.forEach(hora => {
        arrayHoras.push(hora.dataValues.hora)
    });

    return arrayHoras;
}

const getCitaPendienteUser = async(id) => {
    const citasUser = await Cita.findOne({
        where: {
            userId: id,
            fecha: {
                [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        }
    });

    return citasUser.dataValues;
}


// FIXME: cambiar por cita (con todo lo q supone)
// const getCitasPasadasUser = async(id) => {
//     const citasUser = await CitaPasada.findAll({
//         where: {userId: id}
//     });

//     return citasUser;
// }


const getCitasPendientes = async() => {
    return await CitaPendiente.findAll({include: ['user']}); 
}


const getCitasPasadas = async() => {
    return await CitaPasada.findAll({include: ['user']});
}


const updateFechaCitaPendiente = async(id, fecha) => {
    let cita = await CitaPendiente.findByPk(id);
    
    cita.update({fecha: fecha});

    const resp = cita.save();

    return resp;
}


const updateConfirmadaCitaPasada = async(id, confirmada) => {
    let cita = await CitaPasada.findByPk(id);

    cita.update({confirmada: confirmada});

    const resp = cita.save();

    return resp;
}


module.exports = {
    getCitasFecha,
    getCitasFechaHora,
    getHorarioCitas,
    getNumCitasHora,
    getCitaPendienteUser,
    // getCitasPasadasUser,
    getCitasPasadas,
    getCitasPendientes,
    insertCita,
    updateFechaCitaPendiente,
    updateConfirmadaCitaPasada
};
