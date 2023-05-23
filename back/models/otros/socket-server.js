//Isa
const { socketController } = require('../../controllers/chat-controller');
const { Server } = require('socket.io');

const startSocketServer = () => {
  const io = new Server(process.env.PORTSOCKECT, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', socketController);
  
};

module.exports = { startSocketServer };