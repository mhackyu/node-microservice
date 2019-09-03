const router = require('express').Router();
const { location } = require('./controllers');

router.use('/locations', location);

module.exports = router;