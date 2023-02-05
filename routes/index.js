const router = require('express').Router();

router.use('/movies', require('./movies'));

router.use('/genres', require('./genres'));

router.use('/', require('./swagger'));

module.exports = router;