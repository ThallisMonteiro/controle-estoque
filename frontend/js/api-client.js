// Interceptador de fetch - adiciona JWT automaticamente
const originalFetch = window.fetch;

window.fetch = function(...args) {
  const [resource, config = {}] = args;

  // Se for um objeto de configuração, garantir que headers existe
  const fetchConfig = { ...config };
  if (!fetchConfig.headers) {
    fetchConfig.headers = {};
  }

  // Adicionar JWT ao Authorization header se existir
  const token = localStorage.getItem('authToken');
  if (token) {
    fetchConfig.headers['Authorization'] = `Bearer ${token}`;
  }

  // Fazer a requisição original
  return originalFetch(resource, fetchConfig)
    .then(response => {
      // Se retornar 401, limpar dados e redirecionar para login
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login.html';
      }
      return response;
    });
};