const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');

router.get('/perfil', controller.obterPerfil);
router.put('/perfil', controller.atualizarPerfil);
router.post('/alterar-senha', controller.alterarSenha);
router.get('/estatisticas', controller.obterEstatisticas);

module.exports = router;
