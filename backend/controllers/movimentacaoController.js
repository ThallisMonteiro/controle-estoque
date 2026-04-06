const db = require('../db');

exports.criarMovimentacao = async (req, res) => {
  try {
    const { produto_id, tipo, quantidade } = req.body;

    // pega produto atual
    const [produto] = await db.query(
      'SELECT quantidade FROM produtos WHERE id=?',
      [produto_id]
    );

    if (produto.length === 0) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    let novaQuantidade = produto[0].quantidade;

    if (tipo === 'entrada') {
      novaQuantidade += quantidade;
    } else if (tipo === 'saida') {
      if (quantidade > novaQuantidade) {
        return res.status(400).json({ message: 'Estoque insuficiente' });
      }
      novaQuantidade -= quantidade;
    }

    // atualiza estoque
    await db.query(
      'UPDATE produtos SET quantidade=? WHERE id=?',
      [novaQuantidade, produto_id]
    );

    // salva movimentação
    await db.query(
      'INSERT INTO movimentacoes (produto_id, tipo, quantidade) VALUES (?, ?, ?)',
      [produto_id, tipo, quantidade]
    );

    res.json({ message: 'Movimentação registrada!' });

  } catch (err) {
    res.status(500).json(err);
  }
};