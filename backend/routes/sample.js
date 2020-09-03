const router = require('express').Router();
const {sample} = require('../controllers/sampleController');

router.get('/sample', (req,res) => {
    return res.json({success: true});
});

module.exports = router;
