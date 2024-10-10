const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/User.Repository'); // Para buscar o nome do usuário

let io;

const initializeSocket = (server) => {
  io = socketIO(server);

  io.use(async (socket, next) => {
    try {
      // Validação do token JWT
      const token = socket.handshake.query.token; // O token é passado na conexão do cliente
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar o nome do usuário no MySQL com base no ID do token
      const user = await UserRepository.findUserById(decoded.id);
      if (!user) {
        return next(new Error('Autenticação falhou'));
      }

      // Armazena o nome do usuário no socket
      socket.userName = user.name;
      next();
    } catch (err) {
      console.error('Erro na autenticação do socket:', err);
      next(new Error('Autenticação falhou'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.userName}`); // Mostra o nome do usuário no console

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', socket.userName);
    });

    socket.on('signal', (data) => {
      const { roomId, signal } = data;
      socket.to(roomId).emit('signal', signal);
    });

    socket.on('disconnect', () => {
      console.log(`Usuário ${socket.userName} desconectado`); // Mostra o nome do usuário que se desconectou
      io.emit('user-disconnected', socket.userName);
    });
  });
};

module.exports = { initializeSocket };