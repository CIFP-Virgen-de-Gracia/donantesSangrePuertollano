const { socketController } = require('../../controllers/chat-controller');
const { Server } = require('socket.io');

const startSocketServer = () => {
  const io = new Server(3000, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', socketController);
};

module.exports = { startSocketServer };