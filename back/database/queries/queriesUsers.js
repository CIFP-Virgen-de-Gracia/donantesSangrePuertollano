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

//Mario
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

        return id.dataValues;
    }

//Alicia
    getEmail = async(email) => {
        
        const resp = await Email.findOne({
            where: {
                email: email
            }
        });

        return resp;
    }

//Mario
    getEmailById = async(id) => {
        this.sequelize.conectar();

        const resp = await Email.findByPk(id);

        this.sequelize.desconectar();
        return resp.dataValues;
    }

//Mario
    getUser = async(id) => {
        this.sequelize.conectar();

        const user = await User.findByPk(id, {include: 'RolUser'});
        
        this.sequelize.desconectar();
        return user;
    }

//Mario
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

//Mario
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
    
//Mario
    insertUser = async(id, nombre, passwd = null) => { 
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

//Mario
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


//Alicia
    insertEmailNewsletter = async(email) => { 
        this.sequelize.conectar();
        
        try {
            
            const resp = await Email.create({
                email: email
            });
            
            this.sequelize.desconectar();
            
            return resp;
        }
        catch (err) {
            throw err;
        }
    }


//Mario
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

//Alicia
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

//Mario
    updateUserPasswd = async(id, nuevaPasswd) => {
        this.sequelize.conectar();

        let user = await queriesUsers.getUser(id);
        user.passwd = nuevaPasswd;

        const resp = await user.save();

        this.sequelize.desconectar();
        return resp.dataValues;
    }
}

const queriesUsers = new QueriesUsers();

module.exports = queriesUsers;

queriesUsers.getEmailById(3).then(console.log);