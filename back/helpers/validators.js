const {Op} = require('sequelize');
const models = require('../models/index');

const emailExiste = async (email = '') => {

    const existeEmail = await models.Email.findOne({ where: { email: email } });

    if (!existeEmail) {
        throw new Error(`El correo: ${email}, ya está registrado`);
    }
}


const suscritoNewsletter = async (email = '') => {
    
    const suscrito = await models.Email.findOne({
        where: {
            email: email,
            newsletterVerifiedAt: {
                [Op.eq]: null
            }
        }
    });

    if (!suscrito) {
        throw new Error(`El correo: ${email}, ya está suscrito`);
    }
}


module.exports = {
    emailExiste,
    suscritoNewsletter
}
