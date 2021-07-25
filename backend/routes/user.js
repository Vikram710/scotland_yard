const router = require('express').Router();

const {createUser, updateUser} = require('../controllers/userController');

router.post('/create', createUser);
router.post('/update', updateUser);

module.exports = router;
