const express=require('express');
const AgendamentoController = require('../controller/agendamentoController');
const router = express.Router();
const agendamentoController = new AgendamentoController

router.get('/',agendamentoController.getAll)
router.get('/:codigo',agendamentoController.getByCodigo)
router.delete('/:codigo',agendamentoController.deleteAgenda)
router.post('/',agendamentoController.create)
router.put('/:codigo',agendamentoController.update)
router.post('/filtrar',agendamentoController.filtrar)
module.exports=router

