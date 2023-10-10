const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router()

/*-- Requisições GET --*/
router
.get('/niveis', NivelController.pegarTodosNiveis)
.get('/niveis/:id', NivelController.pegarUmNivel)
.post('/niveis', NivelController.criarNivel)
.put('/niveis/:id', NivelController.atualizarNivel)
.delete('/niveis/:id', NivelController.deletarNivel)

module.exports = router