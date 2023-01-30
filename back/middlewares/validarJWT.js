require('dotenv').config();
const jwt = require('jsonwebtoken');
const {response, request} = require('express');

const validarJWT = (req , res , next) => {
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({'msg':'No hay token en la petición.'});
    }

    try {
        const {id} = jwt.verify(token, process.env.JWT_PRIVATEKEY);
        req.idToken = uid;
        next();
    }
    catch (err) {
        res.status(401).json({'msg':'Token no válido.'});
    }
}

module.exports = {
    validarJWT
}