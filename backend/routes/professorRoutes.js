const express=require('express');
const ProfessorController = require('../controller/professorController');
const router = express.Router();
const professorController = new ProfessorController

router.get('/',professorController.getAll)
router.get('/:codigo',professorController.getByCodigo)
router.delete('/:codigo',professorController.deleteDisciplina)
router.post('/',professorController.create)
router.put('/:codigo',professorController.update)
router.post('/filtrar',professorController.filtrar)
module.exports=router

