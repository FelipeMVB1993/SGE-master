const express=require('express');
const AgendaController = require('../controller/agendaController');
const router = express.Router();
const agendaController = new AgendaController

router.get('/',agendaController.getAll)
router.get('/:codigo',agendaController.getByCodigo)
router.delete('/:codigo',agendaController.deleteAgenda)
router.post('/',agendaController.create)
router.put('/:codigo',agendaController.update)
router.post('/filtrar',agendaController.filtrar)
module.exports=router

