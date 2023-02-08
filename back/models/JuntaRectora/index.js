const sequelize = require('../../database/ConexionSequelize');
const { associations } = require('./associations');

sequelize.conectar();

const models = [
	require('./CargoIntegrante'),
	require('./CargoJunta'),
	require('./IntegranteJunta'),
];

// We define all models according to their files.
for (const m of models) {
	m(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
associations(sequelize.db);

sequelize.sync();
sequelize.desconectar();
// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;