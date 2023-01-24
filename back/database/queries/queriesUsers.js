const Rol = require('../../models/Rol');
const User = require('../../models/User');
const RolUser = require('../../models/RolUser');


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

            const user = await User.findOne({where: {email: email, passwd: passwd}, include: 'RolUser'});
            
            this.sequelize.desconectar();
            return user;
        }
        catch (err) {
            throw err;
        }
    }

    insertUser = async(nombre, email, passwd) => {
        try {
            this.sequelize.conectar();

            const resp = await User.create({
                nombre: nombre,
                email: email,
                passwd: passwd
            });

            this.sequelize.desconectar();
            return resp;
        }
        catch (err) {
            throw err;
        }
    }
}

const queriesUsers = new QueriesUsers();

module.exports = queriesUsers;