function associations(sequelize) {
    const { cargoJunta, cargoIntegrante, integranteJunta } = sequelize.models;


    cargoJunta.hasOne(cargoIntegrante, {
        foreignKey: 'idCargo',
        targetKey: 'id',
        as: 'cargoIntegrante'
    });


    cargoIntegrante.belongsTo(cargoJunta, {
        foreignKey: 'idCargo',
        targetKey: 'id',
        as: 'cargoJunta'
    });


    integranteJunta.hasOne(cargoIntegrante, {
        foreignKey: 'idIntegrante',
        targetKey: 'id'/* ,
        as: 'cargoJunta' */
    });

    cargoIntegrante.belongsTo(integranteJunta, {
        foreignKey: 'idIntegrante',
        targetKey: 'id'
    });
}





module.exports = { associations };