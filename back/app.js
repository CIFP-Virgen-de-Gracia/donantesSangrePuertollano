require('dotenv').config()

const Server = require('./models/server');
const server = new Server();

server.listen();


console.log(`Datos de conexión: ${process.env.DB_TABLE_APTO_SANGRE} ${process.env.DB_USER_ALEJANDRO} ${process.env.DB_PASSWORD}`);

