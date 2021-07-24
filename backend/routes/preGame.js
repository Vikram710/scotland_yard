const router = require('express').Router();

const {getCharacters, getTickets, orderAndSelect, getPositions} = require('../controllers/preGameController');

router.post('/get_tickets', getTickets);
router.get('/get_characters', getCharacters);
router.post('/pre_game/order_select', orderAndSelect);
router.get('/get_positions', getPositions);

module.exports = router;
