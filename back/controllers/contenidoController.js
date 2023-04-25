const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { response, request } = require('express');
const { subirArchivo, borrarArchivo } = require('../helpers/FileUpload');
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
                        : null;

                m.imagen = process.env.URL_PETICION + process.env.PORT + "/api/upload/img/" + nombreImg; 
                
                m.documento = m.documento != null 
                    && fs.existsSync(path.join(__dirname, '../uploads/memorias/documentos', m.documento)) 
                        ? process.env.URL_PETICION + process.env.PORT + "/api/upload/doc/" + m.documento 
                        : null;
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


const getDocumento = async (req, res = response) => {
    const pathDoc = path.join(__dirname, '../uploads/memorias/documentos', req.params.nombre);

    return fs.existsSync(pathDoc) 
        ? res.sendFile(pathDoc) 
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


const addOrUpdateMemoria = async(req, res = response) => {
    const extImgs = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'svg', 'webp'];
    const extDocs = ['pdf', 'odt', 'doc', 'docx'];
    
    try {
        const memoria = { id: req.body.id, anio: req.body.anio }

        if (req.files) {  
            memoria.imagen = await comprobarArchivo(req.files.imagen, extImgs, 'memorias/imagenes');
            memoria.documento = await comprobarArchivo(req.files.documento, extDocs, 'memorias/documentos');
        }

        const memResp = await queriesContenidos.addOrUpdateMemoria(memoria);
         
        memResp.imagen = process.env.URL_PETICION + process.env.PORT + "/api/upload/img/" + memResp.imagen;
        memResp.documento = memResp.documento != null 
            ? process.env.URL_PETICION + process.env.PORT + "/api/upload/doc/" + memResp.documento
            : null; 

        const resp = {
            success: true,
            msg: 'Memoria guardada con éxito',
            data: memResp
        }
    
        res.status(200).json(resp);

    } catch (err) { 
        
        const resp = {
            success: false,
            msg: 'Error al guardar la memoria',
        }

        res.status(200).json(resp);
    }
}


const comprobarArchivo = async(archivo, extensiones, carpeta) => {
    if (archivo) {
        if (archivo.size != 0) return await subirArchivo(archivo, extensiones, carpeta);

    } else {
        return null;
    }
}


const deleteMemoria = async(req, res = response) => {
    try {

        const mem = await queriesContenidos.getMemoria(req.params.id);
        let resp = await queriesContenidos.deleteMemoria(req.params.id);

        if (resp == 0) throw error;
        else {
            
            if (mem.imagen) borrarArchivo("memorias/imagenes", mem.imagen);
            if (mem.documento) borrarArchivo("memorias/documentos", mem.documento);

            resp = {
                success: true,
                msg: 'Memoria eliminada con éxito',
                data: req.params.id
            }

            res.status(200).json(resp);
        }

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
    getDocumento,
    getMemorias,
    updateHermandad,
    updateContacto,
    addOrUpdateMemoria,
    deleteMemoria
}