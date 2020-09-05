const router = require('express').Router();

const {createUser} = require('../controllers/userController');

router.post('/user/create', createUser);

module.exports = router;
