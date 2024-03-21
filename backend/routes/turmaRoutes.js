const express=require('express');
const TurmaController = require('../controller/turmaController');
const router = express.Router();
const turmaController = new TurmaController

router.get('/',turmaController.getAll)
router.get('/:codigo',turmaController.getByCodigo)
router.delete('/:codigo',turmaController.deleteTurma)
router.post('/',turmaController.create)
router.put('/:codigo',turmaController.update)
router.post('/filtrar',turmaController.filtrar)
module.exports=router

