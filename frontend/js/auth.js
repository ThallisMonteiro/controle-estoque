const API_URL = 'https://controle-estoque-kvku.onrender.com/api';

// Elementos
const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');
const tabLogin = document.getElementById('tabLogin');
const tabRegistro = document.getElementById('tabRegistro');
const linkRegistro = document.getElementById('linkRegistro');
const linkLogin = document.getElementById('linkLogin');
const mensagem = document.getElementById('mensagem');

// Inputs Login
const loginEmail = document.getElementById('loginEmail');
const loginSenha = document.getElementById('loginSenha');
const lembrarMe = document.getElementById('lembrarMe');

// Inputs Registro
const registroNome = document.getElementById('registroNome');
const registroEmail = document.getElementById('registroEmail');
const registroSenha = document.getElementById('registroSenha');
const registroConfirmarSenha = document.getElementById('registroConfirmarSenha');
const registroRole = document.getElementById('registroRole');

function mostrarMensagem(texto, tipo = 'sucesso') {
  mensagem.textContent = texto;
  mensagem.className = `auth-mensagem ${tipo}`;
  mensagem.style.display = 'block';
  
  setTimeout(() => {
    mensagem.style.display = 'none';
  }, 5000);
}

function irParaAbaSucesso(usuario) {
  // Salvar dados no localStorage
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  localStorage.setItem('usuarioEmail', usuario.email);
  localStorage.setItem('usuarioNome', usuario.nome);
  localStorage.setItem('usuarioRole', usuario.role);
  
  // Redirecionar para dashboard
  window.location.href = 'index.html';
}

// Alternar entre abas
tabLogin.addEventListener('click', () => {
  formLogin.classList.add('ativa');
  formRegistro.classList.remove('ativa');
  tabLogin.classList.add('ativa');
  tabRegistro.classList.remove('ativa');
});

tabRegistro.addEventListener('click', () => {
  formRegistro.classList.add('ativa');
  formLogin.classList.remove('ativa');
  tabRegistro.classList.add('ativa');
  tabLogin.classList.remove('ativa');
});

linkRegistro.addEventListener('click', (e) => {
  e.preventDefault();
  tabRegistro.click();
});

linkLogin.addEventListener('click', (e) => {
  e.preventDefault();
  tabLogin.click();
});

// Login
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = loginEmail.value.trim();
  const senha = loginSenha.value;
  
  if (!email || !senha) {
    mostrarMensagem('Preencha todos os campos!', 'erro');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    
    const dados = await response.json();
    
    if (!response.ok) {
      mostrarMensagem(dados.error || 'Erro ao fazer login', 'erro');
      return;
    }
    
    mostrarMensagem('Login realizado com sucesso!', 'sucesso');
    
    // Aguardar um pouco antes de redirecionar
    setTimeout(() => {
      irParaAbaSucesso(dados.usuario);
    }, 1000);
  } catch (error) {
    console.error('Erro:', error);
    mostrarMensagem('Erro ao conectar com o servidor', 'erro');
  }
});

// Registro
formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const nome = registroNome.value.trim();
  const email = registroEmail.value.trim();
  const senha = registroSenha.value;
  const confirmarSenha = registroConfirmarSenha.value;
  const role = registroRole.value;
  
  if (!nome || !email || !senha || !confirmarSenha) {
    mostrarMensagem('Preencha todos os campos!', 'erro');
    return;
  }
  
  if (senha.length < 6) {
    mostrarMensagem('Senha deve ter no mínimo 6 caracteres', 'erro');
    return;
  }
  
  if (senha !== confirmarSenha) {
    mostrarMensagem('As senhas não correspondem!', 'erro');
    return;
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/registrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        email,
        senha,
        confirmarSenha,
        role
      })
    });
    
    const dados = await response.json();
    
    if (!response.ok) {
      mostrarMensagem(dados.error || 'Erro ao registrar', 'erro');
      return;
    }
    
    mostrarMensagem('Conta criada com sucesso!', 'sucesso');
    
    // Limpar formulário
    registroNome.value = '';
    registroEmail.value = '';
    registroSenha.value = '';
    registroConfirmarSenha.value = '';
    registroRole.value = 'usuario';
    
    // Aguardar um pouco antes de redirecionar
    setTimeout(() => {
      irParaAbaSucesso(dados.usuario);
    }, 1000);
  } catch (error) {
    console.error('Erro:', error);
    mostrarMensagem('Erro ao conectar com o servidor', 'erro');
  }
});

// Verificar se já está logado
window.addEventListener('load', () => {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (usuarioLogado) {
    window.location.href = 'index.html';
  }
});
