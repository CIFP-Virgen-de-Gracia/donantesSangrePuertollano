const mysql = require('mysql2');
const conexion = require('../Conexion');
const sequelize = require('../ConexionSequelize');
const Pregunta = require('../../models/Pregunta');
//Todo Alejandro
class query_Apto_Sangre {

    constructor() {
        this.sequelize = sequelize; 
    }
    getPreguntas = async() => {
        this.sequelize.conectar();
        let resultado = [];
        try {
            console.log("Accediendo a los datos");
            resultado = await Pregunta.findAll();
            this.sequelize.desconectar();
        } catch(error) {
            console.log(error);
            this.sequelize.desconectar();
            throw error;
        }
        return resultado
    }
    getPregunta = async(id) => {
        this.sequelize.conectar();
        let resultado = [];
        try {
            resultado = await this.query(`SELECT * FROM preguntas WHERE id = ?`, [id]);
            this.sequelize.desconectar();
        } catch (error) {
            this.sequelize.desconectar();
            throw error;
        }
        return resultado;
    }

    generarPregunta = async(enunciado, nombre_imagen, respuesta, solucion_problema) => {
        this.sequelize.conectar();
        let resultado = [];
        try {
            resultado = await this.query(`INSERT INTO preguntas (enunciado, nombre_img, respuesta, solucion_problema) VALUES (?, ?, ?, ?)`, [enunciado, nombre_imagen, respuesta, solucion_problema]);
            this.sequelize.desconectar();
        } catch (error) {
            this.sequelize.desconectar();
            throw error;
        }
        return resultado;
    }
}

module.exports = query_Apto_Sangre;