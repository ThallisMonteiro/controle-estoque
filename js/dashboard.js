const totalProdutos = document.getElementById("totalProdutos");
const totalQuantidade = document.getElementById("totalQuantidade");
const valorTotal = document.getElementById("valorTotal");

function atualizarDashboard() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  totalProdutos.textContent = produtos.length;

  let somaQuantidade = 0;
  let somaValor = 0;

  produtos.forEach((produto) => {
    somaQuantidade += produto.quantidade;
    somaValor += produto.quantidade * produto.precoUnitario;
  });

  totalQuantidade.textContent = somaQuantidade;

  valorTotal.textContent =
    "R$ " +
    somaValor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

// Ouvir eventos de atualização de produtos
window.addEventListener("produtosAtualizados", atualizarDashboard);

// Carregar dados inicialmente
atualizarDashboard();
