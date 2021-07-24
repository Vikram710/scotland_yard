const router = require('express').Router();

const {getPossibleRoutes} = require('../controllers/gameController');

router.post('/game/get_possible_routes', getPossibleRoutes);

module.exports = router;
