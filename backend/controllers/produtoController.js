const db = require('../db');

exports.listar = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, quantidade, preco } = req.body;

    await db.query(
      'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
      [nome, quantidade, preco]
    );

    res.json({ message: 'Produto criado!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, preco } = req.body;

    await db.query(
      'UPDATE produtos SET nome=?, quantidade=?, preco=? WHERE id=?',
      [nome, quantidade, preco, id]
    );

    res.json({ message: 'Produto atualizado!' });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM produtos WHERE id=?', [id]);

    res.json({ message: 'Produto deletado!' });
  } catch (err) {
    res.status(500).json(err);
  }
};