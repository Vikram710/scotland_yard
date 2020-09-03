const router = require('express').Router();

const {createRoom,joinRoom} = require('../controllers/roomController');

router.post('/create', createRoom);
router.post('/join/:code',joinRoom);

module.exports = router;
