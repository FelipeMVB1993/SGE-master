const express=require('express');
const MatriculaController = require('../controller/matriculaController');
const router = express.Router();
const matriculaController = new MatriculaController

router.get('/',matriculaController.getAll)
router.get('/:cpf',matriculaController.filtrar)
router.delete('/:cpf',matriculaController.deleteMatricula)
router.post('/',matriculaController.create)
router.put('/:codigo',matriculaController.update)
router.post('/filtrar',matriculaController.filtrar)
module.exports=router