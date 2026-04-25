// Verificar autenticação
verificarAutenticacao();

const API_URL = 'https://controle-estoque-kvku.onrender.com/api';

let usuarioAtual = null;

// Elementos do DOM
const perfilNome = document.getElementById('perfilNome');
const perfilEmail = document.getElementById('perfilEmail');
const perfilAvatar = document.getElementById('perfilAvatar');
const perfilStatus = document.getElementById('perfilStatus');
const perfilDataCriacao = document.getElementById('perfilDataCriacao');
const perfilDataAtualizacao = document.getElementById('perfilDataAtualizacao');

const btnEditarPerfil = document.getElementById('btnEditarPerfil');
const btnAlterarSenha = document.getElementById('btnAlterarSenha');
const btnLogout = document.getElementById('btnLogout');

const formEditarContainer = document.getElementById('formEditarContainer');
const formAlterarSenhaContainer = document.getElementById('formAlterarSenhaContainer');
const formEditarPerfil = document.getElementById('formEditarPerfil');
const formAlterarSenha = document.getElementById('formAlterarSenha');

const editarNome = document.getElementById('editarNome');
const editarEmail = document.getElementById('editarEmail');
const senhaAtual = document.getElementById('senhaAtual');
const novaSenha = document.getElementById('novaSenha');
const confirmarSenha = document.getElementById('confirmarSenha');

const totalProdutosStats = document.getElementById('totalProdutosStats');
const totalCategoriasStats = document.getElementById('totalCategoriasStats');
const totalMovimentacoesStats = document.getElementById('totalMovimentacoesStats');

function formatarData(data) {
  const date = new Date(data);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function obterInicialNome(nome) {
  return nome ? nome.charAt(0).toUpperCase() : 'U';
}

async function carregarPerfil() {
  try {
    const response = await fetch(`${API_URL}/usuarios/perfil`);
    if (!response.ok) throw new Error('Erro ao carregar perfil');
    
    usuarioAtual = await response.json();
    
    // Atualizar UI
    perfilNome.textContent = usuarioAtual.nome;
    perfilEmail.textContent = usuarioAtual.email;
    perfilAvatar.textContent = obterInicialNome(usuarioAtual.nome);
    perfilStatus.textContent = usuarioAtual.ativo ? 'Ativo' : 'Inativo';
    perfilStatus.className = usuarioAtual.ativo ? 'perfil-badge ativo' : 'perfil-badge inativo';
    perfilDataCriacao.textContent = formatarData(usuarioAtual.criado_em);
    perfilDataAtualizacao.textContent = formatarData(usuarioAtual.atualizado_em);
    
    // Preencher formulário de edição
    editarNome.value = usuarioAtual.nome;
    editarEmail.value = usuarioAtual.email;
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar perfil do servidor');
  }
}

async function carregarEstatisticas() {
  try {
    const response = await fetch(`${API_URL}/usuarios/estatisticas`);
    if (!response.ok) throw new Error('Erro ao carregar estatísticas');
    
    const stats = await response.json();
    
    totalProdutosStats.textContent = stats.totalProdutos;
    totalCategoriasStats.textContent = stats.totalCategorias;
    totalMovimentacoesStats.textContent = stats.totalMovimentacoes;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Event Listeners - Editar Perfil
btnEditarPerfil.addEventListener('click', () => {
  formEditarContainer.style.display = 'flex';
});

document.getElementById('fecharEditarPerfil').addEventListener('click', () => {
  formEditarContainer.style.display = 'none';
});

document.getElementById('cancelarEditarPerfil').addEventListener('click', () => {
  formEditarContainer.style.display = 'none';
});

formEditarPerfil.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nome = editarNome.value.trim();
  const email = editarEmail.value.trim();
  
  if (!nome || !email) {
    alert('Preencha todos os campos!');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/usuarios/perfil`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email })
    });
    
    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.error || 'Erro ao atualizar perfil');
    }
    
    alert('Perfil atualizado com sucesso!');
    formEditarContainer.style.display = 'none';
    await carregarPerfil();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro: ' + error.message);
  }
});

// Event Listeners - Alterar Senha
btnAlterarSenha.addEventListener('click', () => {
  formAlterarSenhaContainer.style.display = 'flex';
  senhaAtual.value = '';
  novaSenha.value = '';
  confirmarSenha.value = '';
});

document.getElementById('fecharAlterarSenha').addEventListener('click', () => {
  formAlterarSenhaContainer.style.display = 'none';
});

document.getElementById('cancelarAlterarSenha').addEventListener('click', () => {
  formAlterarSenhaContainer.style.display = 'none';
});

formAlterarSenha.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const senha1 = senhaAtual.value;
  const senha2 = novaSenha.value;
  const senha3 = confirmarSenha.value;
  
  if (!senha1 || !senha2 || !senha3) {
    alert('Preencha todos os campos!');
    return;
  }
  
  if (senha2.length < 6) {
    alert('Nova senha deve ter no mínimo 6 caracteres!');
    return;
  }
  
  if (senha2 !== senha3) {
    alert('As senhas não correspondem!');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/usuarios/alterar-senha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senhaAtual: senha1,
        novaSenha: senha2,
        confirmarSenha: senha3
      })
    });
    
    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.error || 'Erro ao alterar senha');
    }
    
    alert('Senha alterada com sucesso!');
    formAlterarSenhaContainer.style.display = 'none';
    senhaAtual.value = '';
    novaSenha.value = '';
    confirmarSenha.value = '';
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro: ' + error.message);
  }
});

// Event Listener - Logout
btnLogout.addEventListener('click', () => {
  if (confirm('Deseja realmente sair?')) {
    // Limpar dados do usuário
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarioEmail');
    localStorage.removeItem('usuarioNome');
    localStorage.removeItem('usuarioRole');
    
    // Redirecionar para página de login
    window.location.href = 'login.html';
  }
});

// Carregar dados ao iniciar
carregarPerfil();
carregarEstatisticas();
