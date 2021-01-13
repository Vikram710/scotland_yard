const router = require('express').Router();

const {getCharacters, getTickets, orderAndSelect} = require('../controllers/preGameController');

router.post('/get_tickets', getTickets);
router.get('/get_characters', getCharacters);
router.post('/pre_game/order_select', orderAndSelect);

module.exports = router;
