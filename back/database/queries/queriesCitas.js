const CitaPendiente = require('../../models/CitaPendiente');
const sequelize = require('../ConexionSequelize');
const conexion = require('../Conexion');
const moment = require('moment');
const {Op, DATE} = require('sequelize');
const HoraCita = require('../../models/HorasCitas');
const User = require('../../models/User');
const CitaPasada = require('../../models/CitaPasada');


// todo Mario

const getDataValues = (citas) => {
    citas.forEach(cita => {
        cita = cita.dataValues;
    });

    return citas;
}


const insertCita = async(cita) => {

    const resp = await CitaPendiente.create({
        fecha: cita.fecha,
        userId: cita.userId
    });

    sequelize.desconectar();
    return resp.dataValues;
}


// const getCitas = async() => {

//     const citas = await CitaPendiente.findAll();
    
//     return getDataValues(citas);
// }


// const getFechaCitasRes = async() => {
//     const citas = await Cita.findAll({
//         attributes: [fecha]
//     });

//     return getDataValues(citas);
// }


// const getCitasUser = async(userDni) => {
//     const citas = await Cita.findAll({
//         where: {userDni: userDni},
//         order: ['fecha', 'DESC']
//     });

//     return citas;
// }


// const getCitasAntes = async(fecha) => {
//     const citas = await Cita.findAll({
//         where: {
//             fecha: {
//                 [Op.lt]: fecha
//             }
//         }
//     });

//     return citas.dataValues;
// }

// const getCitasDespues = async(fecha) => {
//     const citas = await Cita.findAll({
//         where: {
//             fecha: {
//                 [Op.gt]: fecha
//             }
//         }
//     });

//     return getDataValues(citas);

// }

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
        
        const citas = await conexion.query('SELECT citasPendientes.fecha FROM citasPendientes '
            + 'JOIN users ON citasPendientes.userId = users.id '
            + 'WHERE DATE(citasPendientes.fecha) = ?;', fecha
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
    const user = await CitaPendiente.findOne({
        where: {userId: id}
    });

    return user;
}


const getCitasPendientes = async() => {
    return await CitaPendiente.findAll({include: ['user']}); 
}


const getCitasPasadas = async() => {
    return await CitaPasada.findAll({include: ['user']});
}


// const updateCitaPendiente = async(id, cita) => {
//     for (const key in cita) {
//         if (Object.hasOwnProperty.call(cita, key)) {
//             const val = cita[key];

//             if (val == null) {
//                 delete cita[`${(key)}`];
//             }
//         }
//     }

//     let citaUpdate = await CitaPendiente.findByPk(id);
//     citaUpdate.update(cita);

//     return cita;
// }


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
    insertCita,
    getCitasFecha,
    getCitasFechaHora,
    getHorarioCitas,
    getCitaPendienteUser,
    getCitasPasadas,
    getCitasPendientes,
    updateFechaCitaPendiente,
    updateConfirmadaCitaPasada
}


const cita = {
    at1: null,
    at2: 'ps na',
    at3: null,
    at4: 2
}


