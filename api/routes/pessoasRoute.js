const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

/*-- Inicializando o Router --*/
const router = Router()

/*-- Requisições GET --*/
router
.get('/pessoas', PessoaController.pegarTodasPessoas)
.get('/pessoas/:nome', PessoaController.pegarUmaPessoa)
.get('/pessoas/id/:id', PessoaController.pegarUmaPessoaPorID)
.post('/pessoas', PessoaController.criarPessoa)
.put('/pessoas/:id', PessoaController.atualizarPessoa)
.delete('/pessoas/:id', PessoaController.deletarPessoa)

module.exports = router