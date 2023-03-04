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

    const resp = await Cita.create({
        fecha: cita.fecha,
        userId: cita.userId,
        donacion: cita.donacion,
    });

    return resp.dataValues;
}


const getNumCitasHora = async(fecha) => {
    const n = await Cita.count({
        where: {fecha: fecha}
    });

    return n;
}


const getNumCitasPendientesUser = async(id) => {
    const n = await Cita.count({
        where: {
            userId: id,
            fecha: {
                [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss')
            },
            cancelada: {
                [Op.ne]: true
            }
        }
    });

    return n;
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
    const citasUser = await Cita.findAll({
        attributes: ['id', 'fecha', 'donacion', 'cancelada'],
        where: {
            userId: id,
            fecha: {
                [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        },

        order: [['cancelada', 'ASC'], ['fecha', 'DESC']]
    });

    return (citasUser != null) ? citasUser : null;
}


const getCitasPasadasUser = async(id) => {
    const citasUser = await Cita.findAll({
        attributes: ['id', 'fecha', 'donacion', 'cancelada', 'asistida'],
        where: {
            userId: id,
            fecha: {
                [Op.lte]: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        },

        order: [['fecha', 'DESC']]
    });

    return (citasUser != null) ? citasUser : null;
}

// FIXME: cambiar CitaPendiente por Cita
// const getCitasPendientes = async() => {
//     return await Cita.findAll({include: ['user']}); 
// }


// const getCitasPasadas = async() => {
//     return await Cita.findAll({include: ['user']});
// }


// TODO: hacer middleware comproando que la cita sea del usuario que la cancela
const cancelarCita = async(idCita) => {
    console.log(idCita);
    let cita = await Cita.findByPk(idCita);

    cita.update({cancelada: true});

    const resp = cita.save();

    return resp;
}


// const updateFechaCitaPendiente = async(id, fecha) => {
//     let cita = await Cita.findByPk(id);
    
//     cita.update({fecha: fecha});

//     const resp = cita.save();

//     return resp;
// }


const updateCitaPasadaAsistida = async(id, asistida) => {
    let cita = await Cita.findByPk(id);

    cita.update({asistida: asistida});

    const resp = cita.save();

    return resp;
}


module.exports = {
    // getCitasFecha,
    getCitasFechaHora,
    getHorarioCitas,
    getNumCitasHora,
    getNumCitasPendientesUser,
    getCitaPendienteUser,
    getCitasPasadasUser,
    // getCitasPasadas,
    // getCitasPendientes,
    insertCita,
    cancelarCita,
    updateCitaPasadaAsistida
};

getCitaPendienteUser(1).then(console.log);





