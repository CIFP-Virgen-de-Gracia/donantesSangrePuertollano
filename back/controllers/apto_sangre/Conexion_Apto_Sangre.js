const mysql = require('mysql2');
class Conexion_Apto_Sangre {
    constructor(options){
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER_ALEJANDRO,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE_ALEJANDRO,
            port: process.env.DB_PORT
        });
    }

    conectar = () => {
        this.connection.connect( (err) => {
            if (err) {
                console.error('Error de conexion: ' + err.stack);
                return;
            }
            console.log('Conectado con el identificador ' + this.connection.threadId);
        });
    }

    desconectar = () => {
        this.connection.end( (err) => {
            if (err) {
                console.error('Error de conexion: ' + err.stack);
                return;
            }
        console.log('Desconectado con éxito');
        });
    }

    query = ( sql, values ) => {
        return new Promise(( resolve, reject ) => {
            this.connection.query(sql, values, ( err, rows) => {
                if ( err ) {
                    reject( err )
                } else {
                    // console.log('Llego aquí');
                    if (rows.length === 0) {
                        reject(err);
                    }
                    resolve( rows )
                }
            })
        })
    }

    getPreguntas = async() => {
        let resultado = [];
        try {
            resultado = await this.query(`SELECT * FROM ${process.env.DB_TABLE_APTO_SANGRE}`);
            this.desconectar();
        } catch(error) {
            this.desconectar();
            throw error;
        }
        return resultado
    }
    getPregunta = async(id) => {
        let resultado = [];
        try {
            resultado = await this.query(`SELECT * FROM ${process.env.DB_TABLE_APTO_SANGRE} WHERE id = ?`, [id]);
            this.desconectar();
        } catch (error) {
            this.desconectar();
            throw error;
        }
        return resultado;
    }

    generarPregunta = async(enunciado, nombre_imagen, respuesta, solucion_problema) => {
        let resultado = [];
        try {
            resultado = await this.query(`INSERT INTO ${process.env.DB_TABLE_APTO_SANGRE} (enunciado, nombre_img, respuesta, solucion_problema) VALUES (?, ?, ?, ?)`, [enunciado, nombre_imagen, respuesta, solucion_problema]);
            this.desconectar();
        } catch (error) {
            this.desconectar();
            throw error;
        }
        return resultado;
    }
}

module.exports = Conexion_Apto_Sangre;