const Rol = require('../../models/Rol');
const User = require('../../models/User');
const RolUser = require('../../models/RolUser');
// const {encrypt, decrypt} = require('../../helpers/crypto');
const moment = require('moment');
const sequelize = require('../ConexionSequelize');


class QueriesUsers {
    
    constructor() {
        this.sequelize = sequelize; 
    }

    getUser = async(id) => {
        this.sequelize.conectar();
        const user = await User.findByPk(id, {include: [{model: Rol}]});
        this.sequelize.desconectar();
        return user;
    }


    getUserLogin = async(email, passwd) => {
        try {
            this.sequelize.conectar();
            const user = await User.findOne({

                attributes: ['id', 'nombre', 'iv'],
                where : {
                    email: email, 
                    passwd: passwd,
                    emailVerifiedAt: {
                        [Op.ne]: null
                    }
                },
                include: 'RolUser'
            });
            
            this.sequelize.desconectar();
            return user;
        }
        catch (err) {
            throw Error(err);
        }
    }


    insertUser = async(nombre, email, passwd) => {  // passwd es un objeto con la contraseña encritpada | {encryptedData: '', iv: ''}
        try {
            this.sequelize.conectar();

            const resp = await User.create({
                nombre: nombre,
                email: email,
                passwd: passwd.encryptedPasswd,
                iv: passwd.iv
            });

            console.log('asdfasdfasdf =====>  ' + resp);
            console.log(resp);
            this.sequelize.desconectar();
            return resp;
        }
        catch (err) {
            throw Error(err);
        }
    }

    insertVerificacionEmail = async(id) => {
        try {
            this.sequelize.conectar();
            
            console.log('aquí');
            
            let user = await User.findByPk(id);

            user.update({emailVerifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')})

            const resp = user.save();

            console.log('asdfasdfasdf');
            console.log(resp);

            this.sequelize.desconectar();

            return resp;
        }
        catch (err) {
            throw Error(err);
        }
    }
}

const queriesUsers = new QueriesUsers();

module.exports = queriesUsers;
