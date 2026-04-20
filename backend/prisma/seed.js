const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar dados antigos
  console.log('🧹 Limpando dados antigos...');
  await prisma.movimentacao.deleteMany({});
  await prisma.produto.deleteMany({});
  await prisma.categoria.deleteMany({});
  await prisma.usuario.deleteMany({});

  // 0. Criar Usuários
  console.log('👤 Criando usuários...');
  const senhaHash = await bcrypt.hash('admin123', 10);
  
  const usuarios = await Promise.all([
    prisma.usuario.create({
      data: {
        nome: 'Administrador',
        email: 'admin@estoque.com',
        senha: senhaHash,
        role: 'admin',
        ativo: true
      }
    }),
    prisma.usuario.create({
      data: {
        nome: 'Usuário Teste',
        email: 'usuario@estoque.com',
        senha: senhaHash,
        role: 'usuario',
        ativo: true
      }
    })
  ]);

  console.log(`✅ ${usuarios.length} usuários criados`);
  console.log(`   📧 Admin: admin@estoque.com (senha: admin123)`);
  console.log(`   📧 Usuário: usuario@estoque.com (senha: admin123)`);

  // 1. Criar Categorias
  console.log('📂 Criando categorias...');
  const categorias = await Promise.all([
    prisma.categoria.create({
      data: {
        nome: 'Eletrônicos',
        descricao: 'Produtos eletrônicos em geral'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Periféricos',
        descricao: 'Periféricos de computador'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Áudio',
        descricao: 'Produtos de áudio e som'
      }
    }),
    prisma.categoria.create({
      data: {
        nome: 'Acessórios',
        descricao: 'Acessórios diversos'
      }
    })
  ]);

  console.log(`✅ ${categorias.length} categorias criadas`);

  // 2. Criar Produtos
  console.log('📦 Criando produtos...');
  const produtos = await Promise.all([
    prisma.produto.create({
      data: {
        nome: 'Notebook Dell',
        quantidade: 15,
        preco: 3500.00,
        categoria_id: categorias[0].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Mouse Logitech',
        quantidade: 45,
        preco: 89.90,
        categoria_id: categorias[1].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Teclado Mecânico',
        quantidade: 8,
        preco: 450.00,
        categoria_id: categorias[1].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Monitor LG 27"',
        quantidade: 3,
        preco: 1200.00,
        categoria_id: categorias[0].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Webcam HD',
        quantidade: 12,
        preco: 250.00,
        categoria_id: categorias[1].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Headset Gamer',
        quantidade: 22,
        preco: 350.00,
        categoria_id: categorias[2].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Hub USB 3.0',
        quantidade: 50,
        preco: 120.00,
        categoria_id: categorias[3].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Adaptador HDMI',
        quantidade: 35,
        preco: 45.00,
        categoria_id: categorias[3].id
      }
    }),
    prisma.produto.create({
      data: {
        nome: 'Suporte para Notebook',
        quantidade: 4,
        preco: 180.00,
        categoria_id: categorias[3].id
      }
    })
  ]);

  console.log(`✅ ${produtos.length} produtos criados`);

  // 3. Criar Movimentações
  console.log('📊 Criando movimentações...');
  const movimentacoes = await Promise.all([
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[0].id,
        tipo: 'entrada',
        quantidade: 10
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[1].id,
        tipo: 'saida',
        quantidade: 5
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[2].id,
        tipo: 'entrada',
        quantidade: 4
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[3].id,
        tipo: 'saida',
        quantidade: 2
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[4].id,
        tipo: 'entrada',
        quantidade: 8
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[5].id,
        tipo: 'saida',
        quantidade: 3
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[6].id,
        tipo: 'entrada',
        quantidade: 20
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[7].id,
        tipo: 'saida',
        quantidade: 10
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[8].id,
        tipo: 'entrada',
        quantidade: 2
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[1].id,
        tipo: 'entrada',
        quantidade: 15
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[0].id,
        tipo: 'saida',
        quantidade: 5
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[5].id,
        tipo: 'entrada',
        quantidade: 12
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[6].id,
        tipo: 'saida',
        quantidade: 8
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[4].id,
        tipo: 'saida',
        quantidade: 4
      }
    }),
    prisma.movimentacao.create({
      data: {
        produto_id: produtos[2].id,
        tipo: 'entrada',
        quantidade: 4
      }
    })
  ]);

  console.log(`✅ ${movimentacoes.length} movimentações criadas`);

  console.log('🎉 Seed finalizado com sucesso!');
  console.log('\n📊 Resumo:');
  console.log(`   - Categorias: ${categorias.length}`);
  console.log(`   - Produtos: ${produtos.length}`);
  console.log(`   - Movimentações: ${movimentacoes.length}`);
}

main()
  .catch(e => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
