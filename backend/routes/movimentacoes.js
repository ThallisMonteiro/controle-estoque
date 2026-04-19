const express = require('express');
const router = express.Router();
const controller = require('../controllers/movimentacaoController');

router.get('/', controller.listarMovimentacoes);
router.get('/produto/:produto_id', controller.listarPorProduto);
router.post('/', controller.criarMovimentacao);

module.exports = router;
