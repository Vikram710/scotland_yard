const router = require('express').Router();

const {createRoom, joinRoom, getRoomCode} = require('../controllers/roomController');

router.post('/create', createRoom);
router.get('/get_room_code', getRoomCode);
router.post('/join', joinRoom);

module.exports = router;
