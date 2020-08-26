const router = require('express').Router();
const {sample} = require('../controllers/sampleController');

router.get('/sample', sample);

module.exports = router;
