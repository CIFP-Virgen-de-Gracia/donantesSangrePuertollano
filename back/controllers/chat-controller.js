const queriesChat = require("../database/queries/queries-chat");
const socketController = (socket) => {
    const id_handshake = socket.id;
    console.log(id_handshake)
    let { payload } = socket.handshake.query;
    console.log(payload);
    if (payload != null) {
        console.log("Cliente conectado: ", socket.id); //Estos 'id' son muy volátiles y no es muy correcto usarlos para nada especial. Luego se asociarán los clientes a salas y eso es lo más correcto, gestionarlo en las salas.

        socket.on('disconnect', () => {
            console.log("Cliente desconectado", socket.id);
        });

        //Con esto el servidor escucha al cliente que le envíe este evento: 'enviar-mensaje'.
        // socket.on('enviar-mensaje', (payload) => {
        //     console.log(payload);

        //     //Con lo siguiente, el servidor envía el mensaje a los clientes.
        //     this.io.emit('recibir-mensaje', payload);
        // });

        //Si queremos que el cliente que envío la petición reciba información de retroalimentación, sería así:
        socket.on('enviar-mensaje', (payload, callback) => {
            console.log(callback);
            queriesChat.addMensaje(payload["payload"]).then((respuesta) => {
                console.log(respuesta);
                callback(respuesta);
                socket.broadcast.emit('recibir-mensaje', payload);
              }).catch((error) => {
                console.error('Error al agregar el mensaje:', error);
              });
            });


        /*let repuesta=chatController.addMensaje(payload["payload"]);
        callback(payload["payload"]);
        //Con lo siguiente, el servidor envía el mensaje a los clientes.
        socket.broadcast.emit('recibir-mensaje', payload);*/
    }; //podría servir para que el cliente reciba alguna confirmación de mensaje recibido. Esto aprovecha el canal de comunicación creado en la petición para enviarle la confirmación.
}



module.exports = {
    socketController,
}