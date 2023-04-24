const Sequelize = require('sequelize');
const models = require('../../models/index.js');


//Alicia
getHistoria = async () => {
    const historia = await models.Contenido.findOne({
        attributes: ['id', 'nombre', 'valor'],
        where: {
            nombre: 'historia'
        }
    });

    return historia;
}


getHorarios = async () => {
    const horarios = await models.Horario.findAll();

    return horarios;
}


getTelefonos = async () => {
    const telefonos = await models.Telefono.findAll();

    return telefonos;
}


getDirecciones = async () => {
    const direcciones = await models.Direccion.findAll();

    return direcciones;
}


getCargosJunta = async () => {
    const cargos = await models.CargoJunta.findAll();

    return cargos;
}


getCargoIntegrantes = async () => {
    //https://stackoverflow.com/questions/68132680/how-to-return-values-from-joined-tables-in-sequelize-at-the-same-level-as-master
    const cargosIntegrantes = await models.IntegranteJunta.findAll({
        include: [
            {
                model: models.CargoIntegrante,
                attributes: [],
                as: 'CargoIntegrante',
                include: [
                    {
                        model: models.CargoJunta,
                        attributes: [],
                        as: 'CargoJunta'
                    }
                ]
            }
        ],
        attributes: ['id', 'nombre', [Sequelize.col('CargoIntegrante.CargoJunta.nombre'), 'cargo'],
            [Sequelize.col('CargoIntegrante.CargoJunta.id'), 'idCargo']]
    });

    return cargosIntegrantes;
}


getMemorias = async () => {
    const memorias = await models.Memoria.findAll({ order: [['anio', 'ASC']] });
    
    return memorias;
}


insertHorario = async (horario) => {
    try {

        const resp = await models.Horario.create({
            dia: horario.dia,
            hEntrada: horario.hEntrada,
            hSalida: horario.hSalida,
            createddAt: new Date().toLocaleString()
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


insertTelefono = async (tlfn) => {
    try {

        const resp = await models.Telefono.create({
            numero: tlfn.numero,
            extension: tlfn.extension,
            createddAt: new Date().toLocaleString()
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


updateHistoria = async (valor) => {
    let resp = null;

    try {

        const historia = await models.Contenido.findOne({
            where: {
                nombre: 'historia',
            }
        });

        if (historia == null) {
            resp = await models.Contenido.create({
                nombre: 'historia',
                valor: valor
            });
        } else resp = await historia.update({ valor: valor });

        return resp;

    } catch (err) {
        throw err;
    }
}


updateNombreIntegranteJunta = async (integrante) => {
    try {

        const int = await models.IntegranteJunta.findByPk(integrante.id);
        const respInt = await int.update({ nombre: integrante.nombre });

        return respInt;

    } catch (err) {
        throw err;
    }
}


updateCargoIntegranteJunta = async (integrante) => {
    try {

        const idCargo = await models.CargoJunta.findOne({
            attributes: ['id'],
            where: {
                nombre: integrante.cargo
            }
        });

        const cargoInt = await models.CargoIntegrante.findOne({
            attributes: ['idCargo', 'idIntegrante'],
            where: {
                idIntegrante: integrante.id
            }
        });

        const respCargo = await cargoInt.update({ idCargo: idCargo.id });

        return respCargo;

    } catch (err) {
        throw err;
    }
}


updateDireccion = async (direccion) => {
    try {

        const dir = await models.Direccion.findByPk(direccion.id);
        const resp = await dir.update({
            lugar: direccion.lugar,
            calle: direccion.calle,
            numero: direccion.numero,
            provincia: direccion.provincia,
            ciudad: direccion.ciudad,
            cp: direccion.cp,
            updatedAt: new Date().toLocaleString()
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


updateTelefono = async (telefono) => {
    try {

        const tlfn = await models.Telefono.findByPk(telefono.id);
        const resp = await tlfn.update({
            numero: telefono.numero,
            extension: telefono.extension,
            updatedAt: new Date().toLocaleString()
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


updateHorario = async (horario) => {
    try {

        const h = await models.Horario.findByPk(horario.id);
        const resp = await h.update({
            hEntrada: horario.hEntrada,
            hSalida: horario.hSalida,
            updatedAt: new Date().toLocaleString()
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


addOrUpdateMemoria = async (memoria) => {
    try {

        const [mem, creada] = await models.Memoria.findOrCreate({
            where: { id: memoria.id },
            defaults: {
                id: null,
                anio: memoria.anio,
                imagen: memoria.imagen,
                documento: memoria.documento,
                updatedAt: new Date().toLocaleString()
            }
        });
        
        const resp = creada 
            ? mem 
            : await mem.update({
                anio: memoria.anio,
                imagen: memoria.imagen == null ? mem.imagen : memoria.imagen,
                documento: memoria.documento == null ? mem.documento : memoria.documento,
                updatedAt: new Date().toLocaleString()
            });

        return resp;

    } catch (err) {
        throw err;
    }
}


deleteHorario = async (id) => {
    try {

        const resp = await models.Horario.destroy({
            where: { id: id }
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


deleteTelefono = async (id) => {
    try {

        const resp = await models.Telefono.destroy({
            where: { id: id }
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


deleteMemoria = async(id) => {
    try {
        const resp = await models.Memoria.destroy({
            where: { id: id }
        });

        return resp;

    } catch (err) {
        throw err;
    }
}


deleteImgMemoria = async (id) => {
    try {

        const mem = await models.Memoria.findByPk(id)
        const resp = await mem.update({ imagen: null });

        return resp;

    } catch (err) {
        throw err;
    }
}



module.exports = {
    getHistoria,
    getHorarios,
    getTelefonos,
    getDirecciones,
    getCargosJunta,
    getCargoIntegrantes,
    getMemorias,
    insertHorario,
    insertTelefono,
    updateHistoria,
    updateNombreIntegranteJunta,
    updateCargoIntegranteJunta,
    updateDireccion,
    updateTelefono,
    updateHorario,
    addOrUpdateMemoria,
    deleteHorario,
    deleteTelefono,
    deleteMemoria,
    deleteImgMemoria
};