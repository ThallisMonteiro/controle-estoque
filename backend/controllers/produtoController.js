const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { categoria: true }
    });
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, quantidade, preco, categoria_id } = req.body;

    const produto = await prisma.produto.create({
      data: {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria_id: categoria_id ? parseInt(categoria_id) : null
      },
      include: { categoria: true }
    });

    res.json({ message: 'Produto criado!', produto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, preco, categoria_id } = req.body;

    const produto = await prisma.produto.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria_id: categoria_id ? parseInt(categoria_id) : null
      },
      include: { categoria: true }
    });

    res.json({ message: 'Produto atualizado!', produto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.produto.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Produto deletado!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
