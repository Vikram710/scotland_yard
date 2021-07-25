const router = require('express').Router();

const {createUser} = require('../controllers/userController');

router.post('/create', createUser);

module.exports = router;
