const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { nome: 'asc' }
    });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    const categoria = await prisma.categoria.create({
      data: {
        nome,
        descricao
      }
    });

    res.json({ message: 'Categoria criada!', categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    const categoria = await prisma.categoria.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        descricao
      }
    });

    res.json({ message: 'Categoria atualizada!', categoria });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.categoria.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Categoria deletada!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
