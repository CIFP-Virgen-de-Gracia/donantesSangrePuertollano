const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { response, request } = require('express');
const { subirArchivo, borrarArchivo } = require('../helpers/FileUpload');
const queriesContenidos = require('../database/queries/queriesContenidos');
const urlApiUpload = '/api/upload/';
const urlUploadMemorias = '../uploads/memorias/';
const carpetaMems = 'memorias';
const carpetaImgs = 'imagenes';
const carpetaDocs = 'documentos';

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
                    && fs.existsSync(path.join(__dirname, urlUploadMemorias, carpetaImgs, m.imagen)) 
                        ? m.imagen 
                        : null;

                m.imagen = process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}img/${nombreImg}`; 
                
                m.documento = m.documento != null 
                    && fs.existsSync(path.join(__dirname, urlUploadMemorias, carpetaDocs, m.documento)) 
                        ? process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}doc/${m.documento}` 
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
    const pathImagen = path.join(__dirname, urlUploadMemorias, carpetaImgs, req.params.nombre);

    return fs.existsSync(pathImagen) 
        ? res.sendFile(pathImagen) 
        : res.sendFile(path.join(__dirname, urlUploadMemorias, `${carpetaImgs}/default.png`))
}


const getDocumento = async (req, res = response) => {
    const pathDoc = path.join(__dirname, urlUploadMemorias, carpetaDocs, req.params.nombre);

    return fs.existsSync(pathDoc) 
        ? res.sendFile(pathDoc) 
        : res.sendFile(path.join(__dirname, urlUploadMemorias, `${carpetaImgs}/default.png`))
}


const descargarDocumento = async (req, res = response) => {
    const pathName = path.join(__dirname, urlUploadMemorias, carpetaDocs, req.params.nombre);

    if (!fs.existsSync(pathName)) 
        return res.status(404).json({ msg: 'No existe el archivo' });
    
    return res.download(pathName);
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
        const memoria = { id: req.body.id, anio: req.body.anio };

        if (req.body.imgBorrar) borrarArchivo(`${carpetaMems}/${carpetaImgs}`, req.body.imgBorrar);
        if (req.body.docBorrar) borrarArchivo(`${carpetaMems}/${carpetaDocs}`, req.body.docBorrar);

        if (req.files) {  
            memoria.imagen = await comprobarArchivo(req.files.imagen, extImgs, `${carpetaMems}/${carpetaImgs}`);
            memoria.documento = await comprobarArchivo(req.files.documento, extDocs, `${carpetaMems}/${carpetaDocs}`);
        }

        const memResp = await queriesContenidos.addOrUpdateMemoria(memoria);
        
        memResp.imagen = process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}img/${memResp.imagen}`;
        memResp.documento = memResp.documento != null 
            ? process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}doc/${memResp.documento}`
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
    return (archivo && archivo.size != 0)
        ? await subirArchivo(archivo, extensiones, carpeta)
        : null;
}


const deleteMemoria = async(req, res = response) => {
    try {

        const mem = await queriesContenidos.getMemoria(req.params.id);
        let resp = await queriesContenidos.deleteMemoria(req.params.id);

        if (resp == 0) throw error;
        else {
            
            if (mem.imagen) borrarArchivo(`${carpetaMems}/${carpetaImgs}`, mem.imagen);
            if (mem.documento) borrarArchivo(`${carpetaMems}/${carpetaDocs}`, mem.documento);

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
    descargarDocumento,
    getMemorias,
    updateHermandad,
    updateContacto,
    addOrUpdateMemoria,
    deleteMemoria
}