const router = require('express').Router();

const {getPossibleRoutes, getTimeline} = require('../controllers/gameController');

router.post('/get_possible_routes', getPossibleRoutes);
router.post('/get_timeline', getTimeline);
module.exports = router;
