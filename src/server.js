require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./config/mongo');
const mysqlConnection = require('./config/mysql');
const userRoutes = require('./routes/User.Routes');
const Room = require('./models/Room');

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());

// Rota principal para carregar o chat
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Conexões de banco de dados
mongoConnect();
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Erro de conexão no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rotas de usuários
app.use('/api/users', userRoutes);

// Nova rota para buscar as salas
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find(); // Pega todas as salas do MongoDB
    res.json(rooms); // Retorna as salas em formato JSON
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar as salas', error: err.message });
  }
});

// Nova rota para criar uma sala
app.post('/api/users/rooms', async (req, res) => {
  console.log(req.body);  // Verifique se os dados estão sendo recebidos
  const { name, description, capacity } = req.body;

  // Validação simples dos campos
  if (!name || !description || !capacity) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    const room = new Room({ name, description, capacity });
    await room.save();
    res.status(201).json({ message: 'Sala criada com sucesso!', room });
  } catch (err) {
    console.error('Erro ao criar sala:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Configurando os eventos de Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Escuta o evento de mensagem de chat
  socket.on('chat-message', (message) => {
    console.log(`Mensagem recebida de ${socket.id}: ${message}`);

    // Envia a mensagem para todos os outros clientes
    socket.broadcast.emit('chat-message', { message });
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectou`);
  });
});

// Inicia o servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});