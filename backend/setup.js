#!/usr/bin/env node

/**
 * Script de Setup Inicial do Projeto
 * 
 * Executa as seguintes operações:
 * 1. Reseta o banco de dados (deleta todas as tabelas)
 * 2. Executa as migrations do Prisma
 * 3. Gera o cliente Prisma
 * 4. Executa o seed (popula dados iniciais)
 * 5. Inicia o servidor
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(command, description) {
  try {
    log(`\n▶ ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit', shell: true });
    log(`✓ ${description} concluído!`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao executar: ${description}`, 'red');
    log(`  Comando: ${command}`, 'red');
    return false;
  }
}

async function setup() {
  log('\n╔════════════════════════════════════════════╗', 'blue');
  log('║  🚀 SETUP INICIAL DO PROJETO               ║', 'blue');
  log('║  Estoque Inteligente v1.0.0                ║', 'blue');
  log('╚════════════════════════════════════════════╝', 'blue');

  log('\nEste script irá:', 'yellow');
  log('  1. Resetar o banco de dados (deleta todas as tabelas)', 'yellow');
  log('  2. Executar as migrations do Prisma', 'yellow');
  log('  3. Gerar o cliente Prisma (@prisma/client)', 'yellow');
  log('  4. Popular dados iniciais (seed)', 'yellow');
  log('  5. Iniciar o servidor', 'yellow');

  log('\n⚠️  ATENÇÃO: Todos os dados existentes serão perdidos!', 'red');
  log('Certifique-se de que deseja continuar.\n', 'yellow');

  // Verificar se .env existe
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    log('\n✗ Arquivo .env não encontrado!', 'red');
    log('  Crie o arquivo .env com as variáveis de ambiente necessárias.', 'yellow');
    process.exit(1);
  }

  let success = true;

  // 1. Reset do banco de dados
  success &= executeCommand(
    'npx prisma migrate reset --force',
    'Resetando banco de dados'
  );

  if (!success) {
    log('\n✗ Erro ao resetar o banco de dados!', 'red');
    process.exit(1);
  }

  // 2. Gerar cliente Prisma
  success &= executeCommand(
    'npx prisma generate',
    'Gerando cliente Prisma'
  );

  // 3. Executar seed (se existir)
  const seedPath = path.join(__dirname, 'prisma', 'seed.js');
  if (fs.existsSync(seedPath)) {
    success &= executeCommand(
      'node prisma/seed.js',
      'Populando dados iniciais (seed)'
    );
  } else {
    log('\n⚠️  Arquivo de seed não encontrado. Pulando esta etapa...', 'yellow');
  }

  log('\n╔════════════════════════════════════════════╗', 'blue');
  log('║  ✓ Setup Concluído com Sucesso!            ║', 'green');
  log('║  Iniciando servidor...                     ║', 'blue');
  log('╚════════════════════════════════════════════╝', 'blue');

  // 4. Iniciar o servidor
  log('\n', 'reset');
  try {
    execSync('node server.js', { stdio: 'inherit', shell: true });
  } catch (error) {
    // Erro ao iniciar servidor (normal ao parar o processo)
    process.exit(0);
  }
}

// Executar setup
setup().catch((error) => {
  log(`\n✗ Erro durante o setup: ${error.message}`, 'red');
  process.exit(1);
});
