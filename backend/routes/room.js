const router = require('express').Router();

const {createRoom, joinRoom} = require('../controllers/roomController');

router.post('/room/create', createRoom);
router.post('/room/join/:roomCode', joinRoom);

module.exports = router;
