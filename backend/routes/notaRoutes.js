const express = require('express');
const NotaController = require('../controller/notaController');
const router = express.Router();
const notaController = new NotaController();

router.get('/', notaController.getAll);
router.get('/disciplinas', notaController.getDisciplinas);
router.post('/', notaController.create);
router.put('/:id_nota', notaController.update);
router.delete('/:id_nota', notaController.delete);
router.get('/turmas', notaController.getTurmas);
router.get('/:alunos', notaController.getAlunos);

module.exports = router;
