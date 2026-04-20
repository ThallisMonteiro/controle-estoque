# Estoque Inteligente - Frontend

Interface web responsiva para o sistema de gestão de estoque.

## 🚀 Início Rápido

1. **Certifique-se de que o backend está rodando:**
   ```bash
   cd backend
   npm run setup
   ```

2. **Abra o frontend em seu navegador:**
   - Abra `frontend/login.html` em um navegador web
   - Ou use um servidor web local (ex: Live Server do VS Code)

## 📋 Credenciais Padrão

Após executar o setup do backend, use estas credenciais para login:

**Admin:**
- Email: `admin@estoque.com`
- Senha: `admin123`

**Usuário Comum:**
- Email: `usuario@estoque.com`
- Senha: `admin123`

## 📁 Estrutura de Pastas

```
frontend/
├── index.html              # Dashboard principal
├── login.html              # Página de login/registro
├── produtos.html           # Gestão de produtos
├── categorias.html         # Gestão de categorias
├── movimentacoes.html      # Registrar movimentações
├── relatorios.html         # Relatórios e análises
├── perfil.html             # Perfil do usuário
│
├── js/                     # Scripts JavaScript
│   ├── auth.js             # Lógica de autenticação
│   ├── checkauth.js        # Verificação de autenticação
│   ├── sidebar.js          # Menu lateral dinâmico
│   ├── dashboard.js        # Dashboard com gráficos
│   ├── produtos.js         # CRUD de produtos
│   ├── categorias.js       # CRUD de categorias
│   ├── movimentacoes.js    # Registrar movimentações
│   ├── relatorios.js       # Geração de relatórios
│   ├── perfil.js           # Gerenciar perfil do usuário
│   └── utils.js            # Funções utilitárias
│
└── css/                    # Estilos CSS
    ├── style.css           # Estilos principais
    └── auth.css            # Estilos de autenticação
```

## 🌐 Páginas Disponíveis

### 🔐 Login (`login.html`)
- Tela de login e registro
- Suporte a 2 níveis de usuário (admin e usuario)
- Validações de segurança
- Design responsivo

### 📊 Dashboard (`index.html`)
- Resumo de produtos e estoque
- Gráficos de dados
- Últimas movimentações
- Statísticas em tempo real

### 📦 Produtos (`produtos.html`)
- Listar todos os produtos
- Criar novo produto
- Editar informações
- Deletar produto
- Busca e filtros

### 📂 Categorias (`categorias.html`)
- Gerenciar categorias
- Criar/editar/deletar categorias
- Busca rápida
- Descrições personalizadas

### 🔄 Movimentações (`movimentacoes.html`)
- Registrar entrada de produtos
- Registrar saída de produtos
- Histórico de movimentações
- Rastreamento de destino

### 📈 Relatórios (`relatorios.html`)
- Relatório de produtos
- Relatório de movimentações
- Produtos com estoque baixo
- Exportar para Excel

### 👤 Perfil (`perfil.html`)
- Ver dados do usuário
- Editar perfil
- Alterar senha
- Ver estatísticas pessoais
- Logout

## 🔧 Configuração do Backend

Certifique-se de que a API está rodando em `http://localhost:3000/api`

Se precisar alterar a URL da API, edite a constante `API_URL` no início de cada arquivo `.js`:

```javascript
const API_URL = 'http://localhost:3000/api';
```

## 🎨 Design e UX

- **Tema Dark:** Interface moderna com cores escuras
- **Responsivo:** Funciona em desktop, tablet e mobile
- **Acessível:** Ícones Lucide e navegação intuitiva
- **Animações:** Transições suaves e efeitos visuais
- **Feedback Visual:** Mensagens de sucesso/erro claras

## 🔒 Segurança

- ✅ Autenticação via localStorage
- ✅ Proteção de rotas (verifica login)
- ✅ Logout limpa dados da sessão
- ✅ Hash bcrypt de senhas (backend)
- ✅ Validação de formulários

## 📱 Responsividade

O frontend é totalmente responsivo:
- **Desktop:** Layout completo com sidebar
- **Tablet:** Layout adaptado
- **Mobile:** Menu compacto e botões maiores

## 🐛 Troubleshooting

### "Erro ao conectar com o servidor"
- Verifique se o backend está rodando em `http://localhost:3000`
- Verifique se o MySQL está ligado
- Verifique o console do navegador (F12) para mais detalhes

### "Você foi redirecionado para login"
- Seus dados de sessão expiraram
- Limpe o localStorage (`Ctrl+Shift+Delete`)
- Faça login novamente

### Gráficos não aparecem
- Verifique se Chart.js está carregado
- Verifique o console para erros
- Tente recarregar a página

## 🚀 Deploy

Para deploy em produção:

1. Altere `API_URL` para a URL do seu servidor
2. Configure CORS no backend
3. Minifique os arquivos CSS/JS (opcional)
4. Use um servidor web (nginx, Apache, etc)
5. Configure variáveis de ambiente no backend

## 📞 Suporte

Para questões, consulte:
- Documentação do Lucide Icons: https://lucide.dev/
- Documentação do Chart.js: https://www.chartjs.org/
- Documentação do Prisma: https://www.prisma.io/docs/

## 📄 Licença

Este projeto é de código aberto.
