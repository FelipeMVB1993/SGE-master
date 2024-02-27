const express=require('express');
const DisciplinaController = require('../controller/disciplinaController');
const router = express.Router();
const disciplinaController = new DisciplinaController

router.get('/',disciplinaController.getAll)
router.get('/:codigo',disciplinaController.getByCodigo)
router.delete('/:codigo',disciplinaController.deleteDisciplina)
router.post('/',disciplinaController.create)
router.put('/:codigo',disciplinaController.update)
router.post('/filtrar',disciplinaController.filtrar)
module.exports=router

