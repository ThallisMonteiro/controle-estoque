const { PrismaClient } = require('@prisma/client');

// Para Prisma v7, é melhor usar TypeScript
// Mas vamos tentar com datasource do config
const prisma = new PrismaClient();

async function main() {
  try {
    const categorias = await prisma.categoria.findMany();
    console.log('✅ Funciona!', categorias);
  } catch (error) {
    console.error('Erro:', error.message);
  }
}

main().finally(async () => await prisma.$disconnect());