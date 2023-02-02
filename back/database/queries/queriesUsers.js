const Rol = require('../../models/Rol');
const User = require('../../models/User');
const RolUser = require('../../models/RolUser');
const moment = require('moment');
const sequelize = require('../ConexionSequelize'); 
const {Op} = require('sequelize');
const Email = require('../../models/Email');


class QueriesUsers {
    
    constructor() {
        this.sequelize = sequelize; 
    }

    getIdEmail = async(email) => {
        const id = await Email.findOne({
            attributes: ['id'],
            where: {
                email: email,
                emailVerifiedAt: {
                    [Op.ne]: null
                }
            }
        });

        return id
    }

    getUser = async(id) => {
        this.sequelize.conectar();

        const user = await User.findByPk(id, {include: 'RolUser'});
        
        this.sequelize.desconectar();
        return user;
    }


    getUserLogin = async(email, passwd) => {

        console.log(email + ' <= email | passwd => ' + passwd);
        this.sequelize.conectar();
        
        const id = await this.getIdEmail(email);

        const user = await User.findOne({
            attributes: ['id', 'nombre'],
            where : {
                id: id.dataValues.id,
                passwd: passwd
            },

            include: 'RolUser'
        });

        console.log('user => ' + user);
        this.sequelize.desconectar();
        return user.dataValues;
    }


    insertUser = async(id, nombre, passwd) => { 
            this.sequelize.conectar();

        try {
            const resp = await User.create({
                id: id,
                nombre: nombre,
                passwd: passwd
            });

            this.sequelize.desconectar();
            return resp.dataValues;
        }
        catch (err) {
            throw err;
        }
    }

    insertEmail = async(email) => {
        this.sequelize.conectar();

        let resp = null;
        resp = await Email.findOne({
            attributes: ['id', 'emailVerifiedAt'],
            where: {
                email: email,
            }
        });

        if (resp == null) {
            resp = await Email.create({
                email: email
            });
        }
        else if (resp.dataValues.emailVerifiedAt != null){
            throw Error('usuario ya registrado');
        }

        this.sequelize.desconectar();
        return resp.dataValues.id;
    }


    updateVerificacionEmail = async(id) => {
        try {
            this.sequelize.conectar();
            let email = await Email.findByPk(id);

            email.update({emailVerifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')})

            const resp = email.save();

            this.sequelize.desconectar();

            return resp;
        }
        catch (err) {
            throw err;
        }
    }


    getAbilities = async(roles) =>  {
        try {
            this.sequelize.conectar();

            const rolesAbilities = await Rol.findAll({
                attributes: ['abilities'],
                where: {
                    id: {
                        [Op.in]: roles
                    }
                }
            });

            this.sequelize.desconectar();

            return rolesAbilities;
        }
        catch (err) {
            throw err;
        }
    }
}

const queriesUsers = new QueriesUsers();

module.exports = queriesUsers;