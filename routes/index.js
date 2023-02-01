router = require('express').Router();

router.use('/students', require('./students'));

router.use('/', require('./swagger'));

module.exports = router;