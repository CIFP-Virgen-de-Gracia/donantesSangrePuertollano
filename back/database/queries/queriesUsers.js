const Rol = require('../../models/Rol');
const User = require('../../models/User');
const Email = require('../../models/Email');
const RolUser = require('../../models/RolUser');
const moment = require('moment');
const sequelize = require('../ConexionSequelize'); 
const {Op} = require('sequelize');


class QueriesUsers {
    
    constructor() {
        this.sequelize = sequelize; 
    }

    getUser = async(id) => {
        this.sequelize.conectar();

        const user = await User.findByPk(id, {include: 'RolUser'});
        
        this.sequelize.desconectar();
        return user;
    }


    getUserLogin = async(email) => {

        try {
            this.sequelize.conectar();
            
            const user = await User.findOne({

                attributes: ['id', 'nombre', 'passwd'],
                where : {
                    email: email, 
                    emailVerifiedAt: {
                        [Op.ne]: null
                    }
                },

                include: 'RolUser'
            });
            
            this.sequelize.desconectar();
            return user.dataValues;
        }
        catch (err) {
            throw err;
        }
    }


    insertUser = async(nombre, email, passwd) => { 
        this.sequelize.conectar();

        try {
            const resp = await User.create({
                nombre: nombre,
                email: email,
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
        
        try {
            
            const resp = await Email.create({
                email: email
            });
            
            this.sequelize.desconectar();
            return resp.dataValues;
        }
        catch (err) {
            throw err;
        }
    }

    updateVerificacionEmail = async(id) => {
        try {
            this.sequelize.conectar();
            let user = await User.findByPk(id);

            console.log(id)
            user.update({emailVerifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')})

            const resp = user.save();

            this.sequelize.desconectar();

            return resp;
        }
        catch (err) {
            throw err;
        }
    }

    updateVerificacionEmailNewsletter = async(id) => {
        try {
            this.sequelize.conectar();
            let email = await Email.findByPk(id);

            email.update({newsletterVerifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')})

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


    getIdByEmail = async(email) => {
        try {
            this.sequelize.conectar();

            const resp = await Email.findOne({
                attributes: ['id'],
                where: {
                    email: {
                        [Op.eq]: email
                    }
                }
            });

            this.sequelize.desconectar();

            if (resp) return resp.dataValues
            else return resp;
        }
        catch (err) {
            throw err;
        }
    }
}

const queriesUsers = new QueriesUsers();

module.exports = queriesUsers;
