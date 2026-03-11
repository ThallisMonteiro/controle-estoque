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

window.addEventListener("produtosAtualizados", atualizarDashboard);

function atualizarDashboard() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  let totalProdutos = produtos.length;
  let valorTotal = 0;
  let estoqueBaixo = 0;

  produtos.forEach((produto) => {
    valorTotal += produto.quantidade * produto.precoUnitario;

    if (produto.quantidade <= 5) {
      estoqueBaixo++;
    }
  });

  document.getElementById("totalProdutos").textContent = totalProdutos;

  document.getElementById("valorTotal").textContent = valorTotal.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  );

  document.getElementById("estoqueBaixo").textContent = estoqueBaixo;
}

atualizarDashboard();
