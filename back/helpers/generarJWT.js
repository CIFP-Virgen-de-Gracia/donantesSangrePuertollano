require('dotenv').config();
const jwt = require('jsonwebtoken');


const generarJWT = (id, nombre, iv) => {
    
    const token = jwt.sign({id: id, nombre: nombre, iv: iv}, process.env.JWT_PRIVATEKEY, {
        expiresIn: '24h'
    });

    return token;
}

module.exports = generarJWT;