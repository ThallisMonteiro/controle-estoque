const tabelaMovimentacoes = document.getElementById("tabelaMovimentacoes");

function carregarUltimasMovimentacoes() {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

  tabelaMovimentacoes.innerHTML = "";

  const ultimas = movimentacoes.slice(-5).reverse();

  ultimas.forEach((mov) => {
    const linha = document.createElement("tr");

    const tipoFormatado =
      mov.tipo.toLowerCase() === "saida" ? "Saída" : "Entrada";

    linha.innerHTML = `
      <td>${mov.nome}</td>
      <td class="${mov.tipo.toLowerCase() === "entrada" ? "entrada" : "saida"}">${tipoFormatado}</td>
      <td>${mov.quantidade}</td>
      <td>${mov.data}</td>
      <td>${mov.destino || "-"}</td>

      
    `;

    tabelaMovimentacoes.appendChild(linha);
  });
}

function atualizarDashboard() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

  let valorTotal = 0;
  let estoqueBaixo = 0;

  produtos.forEach((produto) => {
    valorTotal += Number(produto.quantidade) * Number(produto.precoUnitario);

    if (produto.quantidade <= 5) {
      estoqueBaixo++;
    }
  });

  document.getElementById("totalProdutos").textContent = produtos.length;

  document.getElementById("valorTotal").textContent = valorTotal.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  );

  document.getElementById("estoqueBaixo").textContent = estoqueBaixo;

  carregarUltimasMovimentacoes();
}

atualizarDashboard();
