//Isa
const statsController = require('./statsController');
const queriesChat = require("../database/queries/queries-chat");

const connectedUsers = [];
const nombreSala = "Chat"

const conectado = (socket) => {
    let { payload } = socket.handshake.query;
    
    if (payload != 'undefined' && payload != "") {
        if (!connectedUsers.includes(payload)) {
            socket.join(nombreSala);
            connectedUsers.push(payload);
            
            socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
        
        } else {
            socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
        }

    } else {
        console.log("No hay usuario");
    }
};


const desconectado = (socket) => {
    let { payload } = socket.handshake.query;

    const index = connectedUsers.indexOf(payload);

    if (index !== -1) {
        connectedUsers.splice(index, 1);
        socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
        socket.leave(nombreSala);
    }
};


const logout = (socket, data, callback) => {
    socket.leave(nombreSala)

    const index = connectedUsers.indexOf(data["payload"]);

    if (index !== -1) {
        connectedUsers.splice(index, 1);
        callback({ success: true, data: connectedUsers, msg: "Ha cerrado sesion correctamente" });
        socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
        socket.leave(nombreSala);
    }
};


const iniciarSesion = (socket, data, callback) => {
    socket.join(nombreSala);
    connectedUsers.push(data["payload"]);

    callback({ success: true, data: connectedUsers, msg: "Ha iniciado correctamente" });
    socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
};


const enviarMensaje = (socket, data, callback) => {
    if (connectedUsers.includes(data["payload"]["nombreUser"])) {

        queriesChat.addMensaje(data["payload"]).then((respuesta) => {
            callback(respuesta);
            socket.to(nombreSala).emit('enviar-mensaje', respuesta.data);

        }).catch((error) => {
            console.error('Error al agregar el mensaje:', error);
        });

    } else {
        socket.to(nombreSala).emit('error', { message: 'El usuario no está conectado' });
    }
};


const socketController = (socket) => {
    conectado(socket);

    socket.on('iniciarSesion', (data, callback) => {
        iniciarSesion(socket, data, callback);
    });

    socket.on('disconnect', () => {
        desconectado(socket);
    });

    socket.on('enviar-mensaje', (data, callback) => {
        enviarMensaje(socket, data, callback);
    });

    socket.on('logout', (data, callback) => {
        logout(socket, data, callback);
    });

    socket.on('enviar-lista', () => {
        socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
    });

    socket.on('lista', (data,callback) => {
        callback({success:true,data:connectedUsers});
        socket.to(nombreSala).emit("usuario-conectado",connectedUsers);
    });

    socket.on('insertar-donacion', async(payload, callback) => {
        const resp = await statsController.insertDonacion(payload);
        callback(resp);
        socket.broadcast.emit('insertar-donacion', resp); 
    });

    socket.on('insertar-altas', async(payload, callback) => {
        const resp = await statsController.insertAltas(payload);
        callback(resp);
        socket.broadcast.emit('insertar-altas', resp); 
    });
};



module.exports = { socketController }