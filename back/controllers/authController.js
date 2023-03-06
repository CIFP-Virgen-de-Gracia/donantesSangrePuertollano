const { response, request } = require('express');
const queriesUsers = require("../database/queries/queriesUsers");
const generarJWT = require('../helpers/generarJWT');
const correo = require('../helpers/mail');
const genPasswd = require('generate-password');
const titleCase = require('title-case');
const md5 = require('md5');
const genCode = require('../helpers/genCode');
const models = require('../models/index.js');
const userCan = require('../helpers/rolesAbilities');


//Todo Mario menos activarNewsletter
const login = (req, res = response) => { // traer y comparar aquí o traer y volver a chocar con la db.

    queriesUsers.getUserLogin(req.body.email, req.body.passwd).then(user => { // get abilities

        const resp = {
            success: true,
            data: {
                id: user.id,
                nombre: user.nombre,
                token: generarJWT(user.id),
            },
            msg: 'logeado con éxito'
        }

        res.status(200).json(resp);
    }).catch(err => {

        console.log(err);
        const resp = {
            success: false,
            msg: 'fallo en la autenticación',
        }

        res.status(200).json(resp);
    });
}


const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        const [email, creado] = await models.Email.findOrCreate({
            where: { email: correo }
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


const register = async (req, res = response) => { // poner código

    const emailUser = await queriesUsers.insertEmail(req.body.email);

    queriesUsers.insertUser(emailUser.id, titleCase.titleCase(req.body.nombre), req.body.passwd).then(resp => {

        correo.mandarCorreoActivacion(resp.id, req.body.email, 'activarCorreo');
        res.status(201).json({ success: true, msg: 'registrado con éxito' });
    }).catch(err => {
        console.log(err);
        const msg = (err.name == 'SequelizeUniqueConstraintError')
            ? 'usuario ya registrado'
            : 'se ha producido un error';

        res.status(200).json({ success: false, msg: msg });
    });
}


const activarCorreo = (req, res = response) => {
    queriesUsers.updateVerificacionEmail(req.params.id)
        .then(resp => {

            res.status(201).json({ success: true, resp: resp });
        }).catch(err => {

            res.status(200).json({ success: false, error: 'Se ha producido un error' });
        });
}


// Alicia
const activarNewsletter = (req, res = response) => {
    const html = `<div style="font-family: Arial, Helvetica, sans-serif;">
                    <h2 style="border-bottom: 0.3rem solid rgb(174, 17, 40);padding-bottom:.5rem;width:fit-content;">
                        ¡Email verificado con éxito!
                    </h2>
                    <p>Recibirás una notificación por correo cada vez que publiquemos una noticia.</p>
                </div>`;

    queriesUsers.updateVerificacionEmailNewsletter(req.params.id)
        .then(resp => {
            res.send(html);
            /* res.status(201).redirect(process.env.INDEX ); *//*  
            res.status(201).json({ success: true, resp: resp }); */
        }).catch(err => {
            res.status(200).json({ success: false, error: 'Se ha producido un error' });
        });

}


// Alicia
const desactivarNewsletter = (req, res = response) => {
    const html = `<div style="font-family: Arial, Helvetica, sans-serif;">
                    <h2 style="border-bottom: 0.3rem solid rgb(174, 17, 40);padding-bottom:.5rem;width:fit-content;">
                        Te has dado de baja
                    </h2>
                    <p>No recibirías más correos cuando publiquemos una noticia</p>
                </div>`;

    queriesUsers.updateCancelarNewsletter(req.params.id)
        .then(resp => {
            res.send(html);
            
        }).catch(err => {
            res.status(200).json({ success: false, error: err });
        });

}


const mandarEmailRecuperarPasswd = async (req, res = response) => {

    try {
        // const emailUser = await queriesUsers.getEmailById(email); // req.params.id
        const cod = genCode(6);
        const contenido = {
            asunto: 'Recuperación de contraseña',
            cuerpoHtml: `
                Hola. Hemos recibido una solicitud de cambio de contraseña para tu cuenta de la Hermandad de Donantes de Sangre de Puertollano<br>
                Tu código: ${(cod)}.
            `
        }

        correo.mandarCorreo(req.body.email, contenido);

        const emailUser = await queriesUsers.getIdEmail(req.body.email);
        const respUser = await queriesUsers.updateCodRecPasswd(emailUser.id, cod);

        const resp = {
            success: true,
            id: respUser.user.id,
            msg: 'contraseña generada con éxito'
        }

        res.status(200).json(resp);
    }
    catch (err) {

        res.status(200).json({ success: false, msg: 'se ha producido un error' });
    }
}


const recuperarPasswd = async (req, res = response) => {

    try {
        const user = await queriesUsers.getUser(req.params.id);

        let resp = null;
        console.log(user.codRecPasswd);
        if (req.body.cod == user.codRecPasswd) {
            const nuevaPasswd = genPasswd.generate();
            const nuevaPasswdHash = md5(nuevaPasswd);

            const respUpdate = await queriesUsers.updateUserPasswd(req.params.id, nuevaPasswdHash); // req.params.id

            const email = await queriesUsers.getEmailById(req.params.id);
            const contenido = {
                asunto: 'Cambio de contraseña',
                cuerpoHtml: `La nueva contraseña para tu cuenta: ${(nuevaPasswd)}.`
            }
            correo.mandarCorreo(email.email, contenido);

            resp = {
                success: true,
                id: user.id,
                msg: 'passwd cambiada con éxito'
            }
        }
        else {
            resp = {
                success: false,
                msg: 'se ha producido un error'
            }
        }

        res.status(200).json(resp);
    }
    catch (err) {

        console.log(err);
        const resp = { success: false, msg: 'ha sucedido un error' };

        res.status(200).json(resp);
    }
}


const puedeModificar = async (req, res = response) => {
    let resp = { success: false };

    try {
        const autorizado = await userCan(req, req.params.id, ['leer', 'editar', 'borrar']);

        if (autorizado) {
            const user = queriesUsers.getUser(req.params.id);

            resp = {
                success: true,
                data: {
                    id: user.id,
                    nombre: user.nombre,
                    token: generarJWT(user.id),
                }
            }            
        };

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}



module.exports = {
    login,
    register,
    activarCorreo,
    activarNewsletter,
    mandarEmailRecuperarPasswd,
    recuperarPasswd,
    puedeModificar,
    desactivarNewsletter
}
