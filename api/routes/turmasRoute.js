const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');

const router = Router()

/*-- Requisições GET --*/
router
.get('/turmas', TurmaController.pegarTodasTurmas)
.get('/turmas/:id', TurmaController.pegarUmaTurma)
.post('/turmas', TurmaController.criarTurma)
.put('/turmas/:id', TurmaController.atualizarTurma)
.delete('/turmas/:id', TurmaController.deletarTurma)

module.exports = router