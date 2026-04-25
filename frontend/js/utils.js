// Função utilitária para fazer requisições com JWT
async function fazerRequisicao(url, options = {}) {
  const token = localStorage.getItem('authToken');
  
  // Adicionar headers padrão
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Adicionar JWT ao header Authorization se existir
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Fazer requisição
  const response = await fetch(url, {
    ...options,
    headers
  });

  // Se token expirou, redirecionar para login
  if (response.status === 401) {
    localStorage.clear();
    window.location.href = '/login.html';
    return;
  }

  return response;
}

// Função para logout
function fazerLogout() {
  localStorage.clear();
  window.location.href = '/login.html';
}
