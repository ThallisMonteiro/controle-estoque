const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Simular usuário logado (em produção, seria via JWT/session)
let usuarioLogadoId = 1;

exports.obterPerfil = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioLogadoId },
      select: {
        id: true,
        nome: true,
        email: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.atualizarPerfil = async (req, res) => {
  try {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ error: 'Nome e email são obrigatórios' });
    }

    // Verificar se email já existe para outro usuário
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente && usuarioExistente.id !== usuarioLogadoId) {
      return res.status(400).json({ error: 'Este email já está em uso' });
    }

    const usuario = await prisma.usuario.update({
      where: { id: usuarioLogadoId },
      data: {
        nome,
        email,
        atualizado_em: new Date()
      },
      select: {
        id: true,
        nome: true,
        email: true,
        ativo: true,
        criado_em: true,
        atualizado_em: true
      }
    });

    res.json({ message: 'Perfil atualizado com sucesso!', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.alterarSenha = async (req, res) => {
  try {
    const { senhaAtual, novaSenha, confirmarSenha } = req.body;

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (novaSenha !== confirmarSenha) {
      return res.status(400).json({ error: 'As senhas não correspondem' });
    }

    if (novaSenha.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioLogadoId }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Verificar senha atual
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha atual incorreta' });
    }

    // Hash da nova senha
    const novasenhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { id: usuarioLogadoId },
      data: {
        senha: novasenhaHash,
        atualizado_em: new Date()
      }
    });

    res.json({ message: 'Senha alterada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.obterEstatisticas = async (req, res) => {
  try {
    const totalProdutos = await prisma.produto.count();
    const totalCategorias = await prisma.categoria.count();
    const totalMovimentacoes = await prisma.movimentacao.count();

    res.json({
      totalProdutos,
      totalCategorias,
      totalMovimentacoes
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
