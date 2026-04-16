const express = require('express');
const router = express.Router();
const controller = require('../controllers/movimentacaoController');

router.post('/', controller.criarMovimentacao);

module.exports = router;