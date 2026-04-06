const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/produtos',      require('./routes/produtos'));
app.use('/api/movimentacoes', require('./routes/movimentacoes'))
app.use('/api/categorias', require('./routes/categorias'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));