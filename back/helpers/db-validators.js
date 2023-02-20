const models = require('../models/index');
const conx = new Conexion();

const emailExiste = async( email = '' ) => {

    const existeEmail = await models.Email.findOne({ email });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}
