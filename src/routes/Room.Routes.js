const express = require('express');
const { createRoom, listRooms, joinRoom } = require('../controllers/RoomController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Rota para criar uma nova sala
router.post('/rooms', authMiddleware, createRoom); 

// Rota para listar todas as salas
router.get('/rooms', authMiddleware, listRooms); 

// Rota para participar de uma sala
router.post('/rooms/join', authMiddleware, joinRoom);

// (Opcional) Rota para consultar o estado de uma sala, se necessário no futuro
// router.get('/rooms/:id/status', authMiddleware, checkRoomStatus);

module.exports = router;
