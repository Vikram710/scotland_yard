const router = require('express').Router();

const {
	getCharacters,
	getTickets,
	orderAndSelect,
	getPositions,
	getRoomDetails,
} = require('../controllers/preGameController');

router.post('/get_tickets', getTickets);
router.get('/get_characters', getCharacters);
router.post('/order_select', orderAndSelect);
router.get('/get_positions', getPositions);
router.post('/get_room_details', getRoomDetails);

module.exports = router;
