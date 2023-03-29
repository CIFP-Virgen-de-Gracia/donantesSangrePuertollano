const moment = require('moment');
const { response, request } = require('express');
const queriesContenidos = require('../database/queries/queriesContenidos');

//Todo Alicia
const getHistoria = async (req, res = response) => {
    queriesContenidos.getHistoria()
        .then(historia => {

            const resp = {
                success: true,
                data: historia.dataValues
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getHorarios = (req, res = response) => {
    queriesContenidos.getHorarios()
        .then(horarios => {

            horarios.map(h => {
                h.hEntrada = moment(h.hEntrada, "HH:mm:ss").format('HH:mm');
                h.hSalida = moment(h.hSalida, "HH:mm:ss").format('HH:mm');
            })

            const resp = {
                success: true,
                data: horarios,
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getTelefonos = (req, res = response) => {
    queriesContenidos.getTelefonos()
        .then(telefonos => {

            const resp = {
                success: true,
                data: telefonos
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getDirecciones = (req, res = response) => {
    queriesContenidos.getDirecciones()
        .then(direcciones => {

            const resp = {
                success: true,
                data: direcciones
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getCargosJunta = (req, res = response) => {
    queriesContenidos.getCargosJunta()
        .then(listadoCargos => {

            const resp = {
                success: true,
                data: listadoCargos
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getIntegrantesCargo = (req, res = response) => {
    queriesContenidos.getCargoIntegrantes()
        .then(listadoJunta => {

            const resp = {
                success: true,
                data: listadoJunta
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const updateHermandad = async (req, res = response) => {
    
    try {
        const historia = await queriesContenidos.updateHistoria(req.body.historia);
        const nombres = await Promise.all(req.body.junta.map(queriesContenidos.updateNombreIntegranteJunta));

        //TODO: Preguntar a Inma si esto es correcto
        for await (const integrante of req.body.junta) {
            await queriesContenidos.updateCargoIntegranteJunta(integrante);
        }

        const resp = {
            success: true,
            msg: 'Se han guardado los cambios',
        }

        res.status(201).json(resp);

    } catch (err) {
        
        const resp = {
            success: false,
            msg: 'Se ha producido un error',
        }

        res.status(200).json(resp);
    }
}


const updateContacto = async (req, res = response) => {
    
    try {
        await Promise.all([
            req.body.telefonos.borrar.map(queriesContenidos.deleteTelefono),
            req.body.horarios.borrar.map(queriesContenidos.deleteHorario)
        ]);

        const [dirs, tlfns, horarios] = await Promise.all([
            Promise.all(req.body.direcciones.map(queriesContenidos.updateDireccion)),
            Promise.all(req.body.telefonos.guardar.map(t => t.id != -1 ? queriesContenidos.updateTelefono(t) : queriesContenidos.insertTelefono(t))),
            Promise.all(req.body.horarios.guardar.map(h => h.id != -1 ? queriesContenidos.updateHorario(h) : queriesContenidos.insertHorario(h)))
        ]);
       
        const resp = {
            success: true,
            msg: 'Se han guardado los cambios',
            data: {
                "dirs": dirs,
                "tlfns": tlfns,
                "horarios": horarios
            }
        }

        res.status(201).json(resp);

    } catch (err) {
        
        const resp = {
            success: false,
            msg: 'Se ha producido un error',
        }

        res.status(200).json(resp);
    }
}


module.exports = {
    getHistoria,
    getHorarios,
    getTelefonos,
    getDirecciones,
    getCargosJunta,
    getIntegrantesCargo,
    updateHermandad,
    updateContacto
}