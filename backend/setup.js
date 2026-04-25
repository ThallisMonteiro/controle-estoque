#!/usr/bin/env node

/**
 * Script de Setup Inicial do Projeto
 * 
 * Executa as seguintes operações:
 * 1. Executa as migrations do Prisma (sem resetar dados)
 * 2. Gera o cliente Prisma
 * 3. Inicia o servidor
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
    execSync(command, { 
      stdio: 'inherit', 
      shell: true,
      env: { ...process.env, NODE_ENV: 'production' }
    });
    log(`✓ ${description} concluído!`, 'green');
    return true;
  } catch (error) {
    log(`✗ Erro ao executar: ${description}`, 'red');
    log(`  Comando: ${command}`, 'red');
    log(`  Erro: ${error.message}`, 'red');
    return false;
  }
}

async function setup() {
  log('\n╔════════════════════════════════════════════╗', 'blue');
  log('║  🚀 SETUP INICIAL DO PROJETO               ║', 'blue');
  log('║  Estoque Inteligente v1.0.0                ║', 'blue');
  log('╚════════════════════════════════════════════╝', 'blue');

  log('\nEste script irá:', 'yellow');
  log('  1. Executar as migrations do Prisma (sem resetar dados)', 'yellow');
  log('  2. Gerar o cliente Prisma (@prisma/client)', 'yellow');
  log('  3. Iniciar o servidor', 'yellow');

  log('\n✓ Os dados existentes serão preservados!', 'green');

  // Verificar se .env existe
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    log('\n✗ Arquivo .env não encontrado!', 'red');
    log('  Crie o arquivo .env com as variáveis de ambiente necessárias.', 'yellow');
    process.exit(1);
  }

  let success = true;

  // 1. Executar migrations (sem resetar dados)
  success &= executeCommand(
    'node ./node_modules/.bin/prisma migrate deploy --schema=./prisma/schema.prisma',
    'Executando migrations do Prisma'
  );

  if (!success) {
    log('\n⚠️  Tentando alternativa...', 'yellow');
    success = executeCommand(
      'npx prisma migrate deploy',
      'Executando migrations (alternativa)'
    );
  }

  if (!success) {
    log('\n✗ Erro ao executar as migrations!', 'red');
    log('  Dica: Execute manualmente no Render Shell: npx prisma migrate deploy', 'yellow');
    // Não fazer exit, deixar continuar
  }

  // 2. Gerar cliente Prisma
  success &= executeCommand(
    'node ./node_modules/.bin/prisma generate --schema=./prisma/schema.prisma',
    'Gerando cliente Prisma'
  );

  if (!success) {
    success = executeCommand(
      'npx prisma generate',
      'Gerando cliente Prisma (alternativa)'
    );
  }

  // 3. Executar seed (se existir)
  const seedPath = path.join(__dirname, 'prisma', 'seed.js');
  if (fs.existsSync(seedPath)) {
    log('\n⚠️  Arquivo de seed encontrado, mas pulando esta etapa...', 'yellow');
    log('  (Use "npm run seed" para popular dados iniciais)', 'yellow');
  }

  log('\n╔════════════════════════════════════════════╗', 'blue');
  log('║  ✓ Setup Concluído!                        ║', 'green');
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
