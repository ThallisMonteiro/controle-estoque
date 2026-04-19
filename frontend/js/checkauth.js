// Verificação de autenticação global
function verificarAutenticacao() {
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Fazer logout
function fazerLogout() {
  localStorage.removeItem('usuarioLogado');
  localStorage.removeItem('usuarioEmail');
  localStorage.removeItem('usuarioNome');
  localStorage.removeItem('usuarioRole');
  window.location.href = 'login.html';
}

// Obter dados do usuário logado
function obterUsuarioLogado() {
  const usuarioJSON = localStorage.getItem('usuarioLogado');
  return usuarioJSON ? JSON.parse(usuarioJSON) : null;
}

// Verificar autenticação ao carregar a página
window.addEventListener('load', () => {
  verificarAutenticacao();
});
