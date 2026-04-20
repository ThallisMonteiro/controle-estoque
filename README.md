# 🏭 Estoque Inteligente

Sistema completo de gestão de estoque com autenticação, controle de produtos, categorias, movimentações e relatórios.

Projeto de um sistema de controle de estoque desenvolvido com **HTML5, CSS3 e JavaScript vanilla** no frontend, integrado a uma **API REST em Node.js e Express** com banco de dados **MySQL** e **ORM Prisma**.

---

## 🚀 Setup Rápido (Primeira Vez)

### Pré-requisitos
- ✅ Node.js 16+ instalado
- ✅ MySQL 5.7+ instalado e rodando
- ✅ npm ou yarn

### TUTORIAL PARA IDIOTAS, IMPOSSÍVEL DAR ERRADO THALLIS

```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Configure o arquivo .env (veja o arquivo .env.example)

# 4. Execute o setup inicial (Comando Único!)
npm run setup

# 5. Pronto! O backend está rodando em http://localhost:3000
```

✨ O comando `npm run setup` irá:
- ✅ Resetar o banco de dados
- ✅ Executar as migrations Prisma
- ✅ Gerar o cliente Prisma
- ✅ Popular dados iniciais (seed)
- ✅ **Iniciar o servidor automaticamente**

Depois acesse `frontend/login.html` em seu navegador!

---

## 📋 Credenciais Padrão

Após o setup, acesse com:

| Tipo | Email | Senha |
|------|-------|-------|
| 👑 Admin | `admin@estoque.com` | `admin123` |
| 👤 Usuário | `usuario@estoque.com` | `admin123` |

---

## 🛠️ Tecnologias Utilizadas

### 🔹 Backend
- **Node.js** - Runtime JavaScript
- **Express 5.2** - Framework web
- **Prisma 6.19** - ORM
- **MySQL 5.7+** - Banco de dados
- **bcryptjs** - Hash de senhas
- **CORS** - Controle de origem

### 🔹 Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilos responsivos
- **JavaScript Vanilla** - Interatividade
- **Chart.js** - Gráficos
- **Lucide Icons** - Ícones SVG
- **XLSX** - Exportação Excel

---

## 📡 API REST Endpoints

### 🔐 Autenticação
```
POST   /api/auth/login              → Fazer login
POST   /api/auth/registrar          → Registrar novo usuário
```

### 👤 Usuários
```
GET    /api/usuarios/perfil         → Dados do usuário
PUT    /api/usuarios/perfil         → Atualizar perfil
POST   /api/usuarios/alterar-senha  → Trocar senha
GET    /api/usuarios/estatisticas   → Estatísticas
```

### 📂 Categorias
```
GET    /api/categorias              → Listar categorias
POST   /api/categorias              → Criar categoria
PUT    /api/categorias/:id          → Atualizar categoria
DELETE /api/categorias/:id          → Deletar categoria
```

### 📦 Produtos
```
GET    /api/produtos                → Listar produtos
POST   /api/produtos                → Criar produto
PUT    /api/produtos/:id            → Atualizar produto
DELETE /api/produtos/:id            → Deletar produto
```

### 🔄 Movimentações
```
GET    /api/movimentacoes           → Listar movimentações
POST   /api/movimentacoes           → Registrar movimentação
DELETE /api/movimentacoes/:id       → Deletar movimentação
```

---

## 🔧 Scripts Disponíveis

### Backend (`cd backend`)

```bash
# ⭐ PRINCIPAL: Setup completo (recomendado primeira vez)
npm run setup
npm run dev    # Alias para setup

# Iniciar servidor apenas
npm start

# Banco de dados
npm run migrate:reset   # Resetar banco
npm run migrate:dev     # Criar nova migration
npm run generate        # Gerar cliente Prisma
npm run seed            # Executar seed manualmente

# Código
npm run lint            # Validar código
npm run lint:fix        # Corrigir erros
```

---

### Backend (Heroku, Railway, etc)
1. Configure variáveis de ambiente
2. Execute migrações
3. Configure CORS para seu domínio
4. Deploy seu provider

### Frontend (Vercel, Netlify, GitHub Pages)
1. Altere `API_URL` em `js/auth.js` para seu servidor
2. Deploy a pasta `frontend/`
3. Configure domínio no CORS backend

---

✅ **Concluído e Funcionando**
- Sistema completo de autenticação
- CRUD de todas as funcionalidades
- API REST documentada
- Frontend responsivo
- Dashboard com gráficos
- Relatórios e exportação Excel

---

**Última atualização:** Abril 2026  
**Versão:** 1.0.0  
**Desenvolvedor:** Sistema de Gestão de Estoque