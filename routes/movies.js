const router = require('express').Router();

const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

router.post('/', moviesController.addMovie);

// router.put('/:id', moviesController.updateContact);

// router.delete('/:id', moviesController.deleteContact);

module.exports = router;