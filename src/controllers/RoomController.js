const Room = require('../models/Room');

// Criação de uma nova sala
exports.createRoom = async (req, res) => {
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
};

// Listagem de salas
exports.listRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms); // Status 200 explícito
  } catch (err) {
    console.error('Erro ao listar salas:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Participação em uma sala
exports.joinRoom = async (req, res) => {
  const { roomId } = req.body;

  try {
    // Buscando a sala pelo campo _id
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    res.json({ message: 'Você entrou na sala com sucesso!', room });
  } catch (err) {
    console.error('Erro ao entrar na sala:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};