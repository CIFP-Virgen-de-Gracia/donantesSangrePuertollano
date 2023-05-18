//Isa
const queriesChat = require("../database/queries/queries-chat");
const queriesCitas = require('../database/queries/queriesCitas');

const connectedUsers = [];


const conectado = (socket) => {
    let { payload } = socket.handshake.query;
    console.log(payload);
    connectedUsers.push(payload);
    console.log(connectedUsers);

    mandarCorreoRecordatorio();
};


const desconectado = (socket) => {
    console.log('Usuario desconectado');
    let { payload } = socket.handshake.query;
    const index = connectedUsers.indexOf(payload);
    if (index !== -1) {
        connectedUsers.splice(index, 1);
    }
    console.log(connectedUsers);
};


const enviarMensaje = (socket, data, callback) => {
    if (connectedUsers.includes(data["payload"]["nombreUser"])) {
        queriesChat.addMensaje(data["payload"]).then((respuesta) => {
            callback(respuesta);
            socket.broadcast.emit('enviar-mensaje', respuesta.data);
        }).catch((error) => {
            console.error('Error al agregar el mensaje:', error);
        });
    } else {
        socket.emit('error', { message: 'El usuario no está conectado' });
    }
};


const socketController = (socket) => {
    conectado(socket);

    socket.on('disconnect', () => {
        desconectado(socket);
    });

    socket.on('enviar-mensaje', (data, callback) => {
        enviarMensaje(socket, data, callback);
    });
};


module.exports = {
    socketController,
}