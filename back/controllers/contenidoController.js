const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { response, request } = require('express');
const { subirArchivo } = require('../helpers/fileUpload');
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


const getMemorias = (req, res = response) => {
    queriesContenidos.getMemorias()
        .then(memorias => {
            
            memorias.forEach(m => {
                const nombreImg = m.imagen != null 
                    && fs.existsSync(path.join(__dirname, '../uploads/memorias/imagenes', m.imagen)) 
                        ? m.imagen 
                        : null
                        
                m.imagen = process.env.URL_PETICION + process.env.PORT + "/api/upload/" + nombreImg;
            });

            const resp = {
                success: true,
                data: memorias
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


const getImagen = async (req, res = response) => {
    const pathImagen = path.join(__dirname, '../uploads/memorias/imagenes', req.params.nombre);

    return fs.existsSync(pathImagen) 
        ? res.sendFile(pathImagen) 
        : res.sendFile(path.join(__dirname, '../uploads/memorias/imagenes/default.png'))
}


const updateHermandad = async (req, res = response) => {
    
    try {
        const historia = await queriesContenidos.updateHistoria(req.body.historia);
        const nombres = await Promise.all(req.body.junta.map(queriesContenidos.updateNombreIntegranteJunta));
        /* const junta = await Promise.all(req.body.junta.map(integrante => queriesContenidos.updateCargoIntegranteJunta(integrante)))
         */

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
        await Promise.all(
            req.body.direcciones.map(queriesContenidos.updateDireccion),
            req.body.telefonos.guardar.map(t => t.id != -1 ? queriesContenidos.updateTelefono(t) : queriesContenidos.insertTelefono(t)),
            req.body.horarios.guardar.map(h => h.id != -1 ? queriesContenidos.updateHorario(h) : queriesContenidos.insertHorario(h)),
        );

        await Promise.all(
            req.body.telefonos.borrar.map(queriesContenidos.deleteTelefono),
            req.body.horarios.borrar.map(queriesContenidos.deleteHorario)
        );

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


const updateMemoria = async(req, res = response) => {
    const extImgs = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'svg', 'webp'];
    const extDocs = ['pdf', 'odt', 'doc', 'docx'];
    const promesas = [];
    let img = null, doc = null;

    try {
       
        if (req.files) {        
            if (req.files.imagen) promesas.push(subirArchivo(req.files.imagen, extImgs, 'memorias/imagenes'));
            if (req.files.documento) promesas.push(subirArchivo(req.files.documento, extDocs, 'memorias/documentos'));
           
            [img, doc] = await Promise.all(promesas);
        }
    
        const memoria = await queriesContenidos.updateMemoria({ 
            id: req.body.id, 
            anio: req.body.anio, 
            imagen: img, 
            documento: doc 
        });
                
        const resp = {
            success: true,
            msg: 'Memoria editada con éxito',
            data: memoria
        }
    
        res.status(200).json(resp);

    } catch (err) { 
        
        const resp = {
            success: false,
            msg: 'Error al editar la memoria',
        }

        res.status(200).json(resp);
    }
}


const deleteMemoria = async(req, res = response) => {
    try {
        await queriesContenidos.deleteMemoria(req.params.id);

        const resp = {
            success: true,
            msg: 'Memoria eliminada con éxito',
            data: req.params.id
        }

        res.status(200).json(resp);

    } catch(err) {
            
        const resp = {
            success: false,
            msg: 'Error al eliminar la memoria',
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
    getImagen,
    getMemorias,
    updateHermandad,
    updateContacto,
    updateMemoria,
    deleteMemoria
}