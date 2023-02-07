const {response,request} = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const generarJWT = require('../helpers/generarJWT');
const correo = require('../helpers/mail');
const genPasswd = require('generate-password');
const md5 = require('md5');
const User = require('../models/User');


const login = (req, res = response) => { // traer y comparar aquí o traer y volver a chocar con la db.

    
    queriesUsers.getUserLogin(req.body.email).then(user => { // get habilities

        console.log(user);
        let resp = null;

        if (req.body.passwd == user.passwd) {
            resp = {
                success: true,
                token: generarJWT(user.id, user.nombre),
                msg: 'logeado con éxito'
            }
        }
        else {
            resp = {
                success: false,
                msg: 'fallo en la autenticación'
            }
        }

        res.status(200).json(resp);
    }).catch(err => {

        const resp = {
            success: false,
            msg: 'se ha producido un error',
        }

        res.status(200).json(resp);
    });
}


const googleSignin = async(req, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );

        const [email, creado] = await Email.findOrCreate({
            where: {email: correo}
        });

        let user = null;
        user = (creado) 
            ? await queriesUsers.insertUser(email.id, nombre)
            : await queriesUsers.getUser(email.id);
        
        const resp = {
            success: true,
            data: {
                id: user.id,
                nombre: user.nombre,
                token: generarJWT(user.id),
            },
            msg: 'logeado con éxito'
        }

        return res.status(200).json(resp);
    }
    catch (err) {

        const resp = {
            success: false,
            msg: 'error en el registro'
        }

        return res.status(200).json(resp);
    }
}

const register = (req, res = response) => {
    queriesUsers.insertUser(req.body.nombre, req.body.email, req.body.passwd).then(resp => {
        
        correo.mandarCorreoActivacion(resp.id, req.body.email, 'register');
        res.status(201).json({success: true, msg: 'Registrado con éxito'});
    }).catch(err => {

        res.status(200).json({success: false, msg: 'Se ha producido un error'});
    });
}


const activarUsuario = (req, res = response) => {
    queriesUsers.updateVerificacionEmail(req.params.id).then(resp => {
        
        res.status(201).json({success: true, msg: resp});
    }).catch(err => {

        res.status(200).json({success: false, msg: 'Se ha producido un error'});
    });
}


const recuperarPasswd = async(id) => {

    const nuevaPasswd = genPasswd.generate();
    const nuevaPasswdHash = md5(nuevaPasswd);


    let contenido = {};
    contenido.asunto = 'Recuperación de contraseña';
    
    try {
    const email = await queriesUsers.getEmailById(id); // req.params.id
    
    contenido.cuerpoHtml = `
        Hola. Esta es la nueva contraseña de tu cuenta de la Hermandad de Donantes de Sangre de Puertollano: ${(nuevaPasswd)}.<br> 
    `;
    
        correo.mandarCorreo(email.email, contenido);
        const resp = await queriesUsers.updateUserPasswd(id, nuevaPasswdHash); // req.params.id

        console.log('pues si');
        // res.status(200).json({success: true, msg: 'contraseña generada con éxito'});
    }
    catch (err) {

        console.log(err);
        // res.status(200).json({success: false, msg: 'se ha producido un error'});
    }


}

module.exports = {
    login,
    register,
    activarUsuario
}

recuperarPasswd(3);