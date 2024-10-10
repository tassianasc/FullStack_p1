const express = require('express');
const { register, login } = require('../controllers/UserController'); // Importa os controladores de usuário
const { createRoom, listRooms, joinRoom } = require('../controllers/RoomController'); // Importa os controladores de sala
const authMiddleware = require('../middlewares/auth'); // Middleware de autenticação

const router = express.Router();

// Rotas de autenticação de usuários
router.post('/register', register);  // Rota para registro de usuário
router.post('/login', login);        // Rota para login de usuário

// Rotas de salas de reunião (protegidas por autenticação)
router.post('/rooms', authMiddleware, createRoom); // Criar uma nova sala
router.get('/rooms', authMiddleware, listRooms);   // Listar todas as salas
router.post('/rooms/join', authMiddleware, joinRoom); // Participar de uma sala

module.exports = router;
