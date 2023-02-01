const router = require('express').Router();

const studentsController = require('../controllers/students');

router.get('/', studentsController.getAll);

router.get('/:id', studentsController.getSingle);

router.post('/', studentsController.addStudent);

// router.put('/:id', studentsController.updateContact);

// router.delete('/:id', studentsController.deleteContact);

module.exports = router;