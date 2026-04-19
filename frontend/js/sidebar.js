function criarSidebar() {
  const caminhoAtual = window.location.pathname;
  const nomeArquivo = caminhoAtual.split('/').pop() || 'index.html';

  const sidebarHTML = `
    <button class="menu-button" aria-expanded="false" aria-controls="sidebar-nav">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <header class="sidebar" id="sidebar-nav">
      <div class="logo_text">
        <img src="logo.png" alt="Logo" class="logo-icon">
        <span class="logo-full">Estoque<br>Inteligente</span>
      </div>

      <nav>
        <ul>
          <li>
            <a href="index.html" class="${nomeArquivo === 'index.html' ? 'ativo' : ''}">
              <i data-lucide="layout-dashboard"></i>
              <span class="link-text">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="produtos.html" class="${nomeArquivo === 'produtos.html' ? 'ativo' : ''}">
              <i data-lucide="box"></i>
              <span class="link-text">Produtos</span>
            </a>
          </li>

          <li>
            <a href="movimentacoes.html" class="${nomeArquivo === 'movimentacoes.html' ? 'ativo' : ''}">
              <i data-lucide="arrow-left-right"></i>
              <span class="link-text">Movimentações</span>
            </a>
          </li>

          <li>
            <a href="categorias.html" class="${nomeArquivo === 'categorias.html' ? 'ativo' : ''}">
              <i data-lucide="list"></i>
              <span class="link-text">Categorias</span>
            </a>
          </li>

          <li>
            <a href="relatorios.html" class="${nomeArquivo === 'relatorios.html' ? 'ativo' : ''}">
              <i data-lucide="bar-chart-3"></i>
              <span class="link-text">Relatórios</span>
            </a>
          </li>

          <li>
            <a href="perfil.html" class="${nomeArquivo === 'perfil.html' ? 'ativo' : ''}">
              <i data-lucide="User"></i>
              <span class="link-text">Perfil</span>
            </a>
          </li>

        </ul>
      </nav>
    </header>
  `;

  const div = document.createElement('div');
  div.innerHTML = sidebarHTML;
  
  // Inserir todos os elementos no início do body
  while (div.firstChild) {
    document.body.insertBefore(div.firstChild, document.body.firstChild);
  }

  // Configurar botão de menu
  const menuButton = document.querySelector('.menu-button');
  const sidebar = document.querySelector('.sidebar');

  // Toggle sidebar ao clicar no botão
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
    sidebar.classList.toggle('open');
  });

  // Fechar sidebar ao clicar em um link (apenas em mobile)
  const links = sidebar.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuButton.setAttribute('aria-expanded', 'false');
        sidebar.classList.remove('open');
      }
    });
  });

  // Fechar sidebar ao clicar fora dela (em mobile)
  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 768) {
      const isClickOnSidebar = sidebar.contains(event.target);
      const isClickOnButton = menuButton.contains(event.target);
      
      if (!isClickOnSidebar && !isClickOnButton) {
        menuButton.setAttribute('aria-expanded', 'false');
        sidebar.classList.remove('open');
      }
    }
  });

  // Reinicializar Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

criarSidebar();
