const router = require('express').Router();

const {createRoom, joinRoom, getRoomCode} = require('../controllers/roomController');

router.post('/room/create', createRoom);
router.get('/room/get_room_code', getRoomCode);
router.post('/room/join', joinRoom);

module.exports = router;
