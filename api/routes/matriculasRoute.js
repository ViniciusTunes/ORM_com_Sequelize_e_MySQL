const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router()

/*-- Requisições GET --*/
router
.get('/matriculas', MatriculaController.pegarTodasMatriculas)
.get('/matriculas/:id', MatriculaController.pegarUmaMatricula)
.get('/pessoas/:estudanteID/matricula/:matriculaID', MatriculaController.pegarUmaMatricula)
.post('/pessoas/:estudanteID/matricula', MatriculaController.criarMatricula)

module.exports = router