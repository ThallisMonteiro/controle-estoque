const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Categorias funcionando!' });
});

module.exports = router;