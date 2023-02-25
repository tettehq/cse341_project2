const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/movies',requiresAuth(), require('./movies'));

router.use('/genres',requiresAuth(), require('./genres'));

router.use('/', require('./swagger'));

module.exports = router;