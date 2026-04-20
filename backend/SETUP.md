# Estoque Inteligente - Backend

Sistema de gestão de estoque com autenticação, controle de produtos, categorias e movimentações.

## 🚀 Setup Inicial

Para configurar o projeto pela primeira vez na sua máquina, execute:

```bash
npm run setup
```

Este comando irá automaticamente:
1. ✅ Resetar o banco de dados (deletar todas as tabelas)
2. ✅ Executar as migrations do Prisma
3. ✅ Gerar o cliente Prisma (@prisma/client)
4. ✅ Popular dados iniciais (seed)
5. ✅ Iniciar o servidor

## 📋 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=controle_estoque
PORT=3000
DATABASE_URL="mysql://root:@localhost:3306/controle_estoque"
```

**Nota:** Ajuste os valores conforme sua configuração local.

## 📦 Scripts Disponíveis

### `npm run setup` ou `npm run dev`
Executa o setup completo (reset, migrations, seed, start)

### `npm start`
Inicia apenas o servidor (sem resetar o banco)

### `npm run seed`
Popula o banco com dados iniciais

### `npm run migrate:reset`
Reseta o banco de dados e executa as migrations

### `npm run migrate:dev`
Cria uma nova migration e aplica ao banco

### `npm run generate`
Gera o cliente Prisma

### `npm run lint`
Verifica erros com ESLint

### `npm run lint:fix`
Corrige erros automaticamente com ESLint

## 🗄️ Banco de Dados

O projeto usa MySQL com Prisma ORM.

**Tabelas principais:**
- `Usuario` - Usuários da aplicação (admin e usuario)
- `Categoria` - Categorias de produtos
- `Produto` - Produtos em estoque
- `Movimentacao` - Histórico de movimentações (entrada/saída)

## 🔐 Autenticação

O sistema suporta 2 níveis de usuário:
- **admin** - Acesso total ao sistema
- **usuario** - Acesso limitado

Endpoints de autenticação:
- `POST /api/auth/login` - Fazer login
- `POST /api/auth/registrar` - Registrar novo usuário

## 📡 Endpoints da API

### Autenticação
- `POST /api/auth/login`
- `POST /api/auth/registrar`

### Usuários
- `GET /api/usuarios/perfil`
- `PUT /api/usuarios/perfil`
- `POST /api/usuarios/alterar-senha`
- `GET /api/usuarios/estatisticas`

### Categorias
- `GET /api/categorias`
- `POST /api/categorias`
- `PUT /api/categorias/:id`
- `DELETE /api/categorias/:id`

### Produtos
- `GET /api/produtos`
- `POST /api/produtos`
- `PUT /api/produtos/:id`
- `DELETE /api/produtos/:id`

### Movimentações
- `GET /api/movimentacoes`
- `POST /api/movimentacoes`
- `DELETE /api/movimentacoes/:id`

## 🛠️ Dependências Principais

- **Express** - Framework web
- **Prisma** - ORM para MySQL
- **MySQL2** - Driver MySQL
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de origem cruzada
- **dotenv** - Variáveis de ambiente

## 📝 Estrutura do Projeto

```
backend/
├── controllers/      # Lógica de negócio
├── routes/          # Definição de rotas
├── prisma/          # Schema e migrations
├── setup.js         # Script de setup inicial
├── server.js        # Arquivo principal
├── package.json     # Dependências
├── .env             # Variáveis de ambiente
└── db.js            # Configuração do banco
```

## ⚠️ Importante

- O comando `npm run setup` **deleta todos os dados** do banco
- Use com cuidado em produção
- Sempre faça backup antes de rodar reset

## 🐛 Troubleshooting

### Erro: "DATABASE_URL not found"
- Verifique se o arquivo `.env` existe
- Verifique se a variável `DATABASE_URL` está definida

### Erro: "Cannot find module 'bcryptjs'"
- Execute `npm install`

### Erro: "Cannot connect to MySQL"
- Verifique se o MySQL está rodando
- Verifique as credenciais no `.env`

## 📞 Suporte

Para questões ou problemas, consulte a documentação do Prisma:
https://www.prisma.io/docs/
