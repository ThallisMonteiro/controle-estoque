const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarMovimentacao = async (req, res) => {
  try {
    const { produto_id, tipo, quantidade } = req.body;

    // Validar tipo
    if (!['entrada', 'saida'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo deve ser "entrada" ou "saida"' });
    }

    // Buscar produto atual
    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(produto_id) }
    });

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Calcular nova quantidade
    let novaQuantidade = produto.quantidade;

    if (tipo === 'entrada') {
      novaQuantidade += parseInt(quantidade);
    } else if (tipo === 'saida') {
      if (parseInt(quantidade) > novaQuantidade) {
        return res.status(400).json({ error: 'Estoque insuficiente' });
      }
      novaQuantidade -= parseInt(quantidade);
    }

    // Atualizar estoque e criar movimentação em transação
    const resultado = await prisma.$transaction([
      // Atualizar quantidade do produto
      prisma.produto.update({
        where: { id: parseInt(produto_id) },
        data: { quantidade: novaQuantidade }
      }),
      // Criar movimentação
      prisma.movimentacao.create({
        data: {
          produto_id: parseInt(produto_id),
          tipo,
          quantidade: parseInt(quantidade)
        }
      })
    ]);

    res.json({
      message: 'Movimentação registrada!',
      movimentacao: resultado[1],
      novaQuantidade: resultado[0].quantidade
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await prisma.movimentacao.findMany({
      include: { produto: true },
      orderBy: { criado_em: 'desc' }
    });
    res.json(movimentacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarPorProduto = async (req, res) => {
  try {
    const { produto_id } = req.params;

    const movimentacoes = await prisma.movimentacao.findMany({
      where: { produto_id: parseInt(produto_id) },
      include: { produto: true },
      orderBy: { criado_em: 'desc' }
    });

    res.json(movimentacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
