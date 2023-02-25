const router = require('express').Router();

const genresController = require('../controllers/genres');

router.get('/', genresController.getAll);

router.get('/:genreName', genresController.getSingle);

router.post('/', genresController.addGenre);

router.put('/:id', genresController.updateGenre);

router.delete('/:genreName', genresController.deleteGenre);

module.exports = router;