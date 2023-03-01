const sequelize = require('../ConexionSequelize');
const Galeria = require('../../models/Galeria');
const fs = require("fs");
const path = require('path');
const fileUpload = require('express-fileupload');
const File = require('../../helpers/FileUpload');

const assets = require('../../helpers/irAssets');

//Todo Alejandro
class Queries_Galeria {

    constructor() {
        this.sequelize = sequelize; 
    }
    getGaleria_Imagenes = async() => {
        this.sequelize.conectar();
        let resultado = [];
        try {
            resultado = await Galeria.findAll();
            this.sequelize.desconectar();
        } catch(error) {
            console.log(error);
            this.sequelize.desconectar();
            throw error;
        }
        return resultado
    }

    insertarGaleria_Imagen = async (req) => {
        let data = "";
        this.sequelize.conectar();
        try {
            let galeria = new Galeria();
            galeria.id = null;
            const nombre = await File.subirArchivo(req.files, undefined, 'galeria');
            assets.copiarAssests('galeria', 'galeria', nombre);
            galeria.nombre = nombre;
            const resp = await galeria.save();

            data = {
                "id": resp.id,
                "nombre": galeria.nombre
            }
            
        } catch (err) {
            throw err;
        }

        this.sequelize.desconectar();
        return data;
    }

    getGaleria_Imagen = async (id) => {
        this.sequelize.conectar();
        const imagen = await Galeria.findByPk(id);
        this.sequelize.desconectar();
        return imagen;
    }

    deleteGaleriaImagen = async(id) => {
        this.sequelize.conectar();
        let galeria = await Galeria.findByPk(id);
        if (!galeria) {
            this.sequelize.desconectar();
            throw error;
        }
        else{
            let pathImagen = path.join(__dirname, '../../uploads', "galeria", galeria["nombre"]);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
            pathImagen = path.join(__dirname, '../../../front/src/assets/imagenes', "galeria", galeria["nombre"]);
            if(fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
        
        await galeria.destroy();
        this.sequelize.desconectar();
        return galeria;
    }
}

const queries_Galeria = new Queries_Galeria();

module.exports = queries_Galeria;