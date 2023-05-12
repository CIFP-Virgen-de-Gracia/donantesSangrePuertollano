const sequelize = require('../ConexionSequelize');
const conexion = require('../Conexion');
const moment = require('moment');
const {Op, DATE} = require('sequelize');
const models = require('../../models/index.js');


// todo Mario

const getDataValues = (citas) => {
    citas.forEach(cita => {
        cita = cita.dataValues;
    });

    return citas;
}


const insertCita = async(cita) => {

    const resp = await models.Cita.create({
        fecha: cita.fecha,
        userId: cita.userId,
        donacion: cita.donacion,
    });

    return resp.dataValues;
}


const getNumCitasHora = async(fecha) => {
    const n = await models.Cita.count({
        where: {fecha: fecha}
    });

    return n;
}


const getNumCitasPendientesUser = async(id) => {
    const n = await models.Cita.count({
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


const getHorarioCitas = async(dia) => {

    const fecha = new Date(dia);
    let codDia = '';

    switch (fecha.getDay()) {
        case 1:
            
            codDia = 'l';
            break;
    
        case 2:
            
            codDia = 'm';
            break;
        
        case 3:
            
            codDia = 'x';
            break;

        case 4:
            
            codDia = 'j';
            break;

        case 5:
            
            codDia = 'v';
            break;

        case 6:
            
            codDia = 's';
            break;
    }

    const horas = await conexion.query('SELECT diasHoras.hora FROM diasHoras '
        + 'JOIN horarios ON horarios.codDia = diasHoras.codDia '
        + 'WHERE horarios.codDia LIKE ' + "'" + codDia + "'");
    
    let arrayHoras = [];
    horas.forEach(hora => {
        arrayHoras.push(hora.hora);

    });

    console.log(arrayHoras);
    return arrayHoras;
}


const getCitaPendienteUser = async(id) => {
    const citasUser = await models.Cita.findAll({
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
    const citasUser = await models.Cita.findAll({
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

const getCitasPendientes = async() => {
    return await models.Cita.findAll({
        attributes: ['id', 'fecha', 'donacion', 'cancelada'],
        where: {
            fecha: {
                [Op.gt]: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        },
        include: ['user'],
        order: [['cancelada', 'ASC'], ['fecha', 'DESC']]
    }); 
}


const getCitasPasadas = async() => {
    return await models.Cita.findAll({
        attributes: ['id', 'fecha', 'donacion', 'cancelada', 'asistida'],
        where: {
            fecha: {
                [Op.lte]: moment().format('YYYY-MM-DD HH:mm:ss')
            }
        },
        include: ['user'],
        order: [['fecha', 'DESC']]
    });
}


// const getCitas = async() => {
//     return await models.Cita.findAll({
//         attributes: ['id', 'fecha', 'donacion', 'cancelada', 'asistida'],
//         where: {
//             fecha: {
//                 [Op.lte]: moment().format('YYYY-MM-DD HH:mm:ss')
//             }
//         },
//         include: ['user'],
//         order: [['fecha', 'DESC']]
//     });
// }


// TODO: hacer middleware comproando que la cita sea del usuario que la cancela
const cancelarCita = async(idCita) => {
    let cita = await models.Cita.findByPk(idCita);

    cita.update({cancelada: true});

    const resp = cita.save();

    return resp;
}


const updateFechaCitaPendiente = async(id, fecha) => {
    let cita = await models.Cita.findByPk(id, {include: ['user']});
    

    cita.fecha = fecha;
    cita.update({fecha: fecha});

    const resp = cita.save();

    return resp;
}


const updateCitaPasadaAsistida = async(id, asistida) => {
    let cita = await models.Cita.findByPk(id);

    cita.update({asistida: asistida});

    const resp = cita.save();

    return resp;
}


const updateNumPersonasCita = async(nPersonas) => {
    let param = await models.ParametrosGenerales.findByPk(1);

    param.update({valor: nPersonas});

    const resp = param.save();

    return resp;
}


const insertHoraCita = async(codDia, hora) => {
    const resp = models.DiaHora.create({
        codDia: codDia,
        hora: hora
    });

    return resp;
}


const deleteHoraCita = async(hora) => {
    const resp = await models.DiaHora.destroy({
        where: {hora: hora}
    });

    return resp;
}


const getHorarioDia = async(codDia) => {
    const resp = await models.Horario.findAll({
        attributes: ['hEntrada', 'hSalida'],
        where: {codDia: codDia}
    });

    return resp;
}


module.exports = {
    getCitasFechaHora,
    getHorarioCitas,
    getNumCitasHora,
    getNumCitasPendientesUser,
    getCitaPendienteUser,
    getCitasPasadasUser,
    getCitasPasadas,
    getCitasPendientes,
    insertCita,
    cancelarCita,
    updateFechaCitaPendiente,
    updateCitaPasadaAsistida,
    updateNumPersonasCita,
    insertHoraCita,
    deleteHoraCita,
    getHorarioDia
};

getHorarioCitas('2023-05-24');
// getHorarioDia('m').then(console.log);