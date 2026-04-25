const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app = express();
const { verificarToken } = require('./middleware/autenticacao');

app.use(cors());
app.use(express.json());

// Rotas públicas (sem autenticação)
app.use('/api/auth', require('./routes/autenticacao'));

// Rotas protegidas (requerem JWT)
app.use('/api/categorias',     verificarToken, require('./routes/categorias'));
app.use('/api/produtos',       verificarToken, require('./routes/produtos'));
app.use('/api/movimentacoes',  verificarToken, require('./routes/movimentacoes'));
app.use('/api/usuarios',       verificarToken, require('./routes/usuarios'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
