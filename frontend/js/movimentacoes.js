let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

const produtoSelect = document.getElementById("produtoSelect");
const tipoSelect = document.getElementById("tipo");
const quantidadeInput = document.getElementById("quantidadeMov");
const destinoInput = document.getElementById("destino");
const tabela = document.getElementById("tabelaMovimentacoes");
const btnRegistrar = document.getElementById("registrarMov");
const btnLimpar = document.getElementById("limparMov");

function carregarProdutos() {
  produtoSelect.innerHTML = "";

  produtos.forEach((produto) => {
    const option = document.createElement("option");
    option.value = produto.id;
    option.textContent = produto.nome;
    produtoSelect.appendChild(option);
  });
}


function renderizarMovimentacoes() {
  tabela.innerHTML = "";

  movimentacoes.forEach((mov) => {

    const tipoFormatado =
      mov.tipo.toLowerCase() === "saida" ? "Saída" : "Entrada";

    const classeTipo =
      mov.tipo.toLowerCase() === "entrada" ? "entrada" : "saida";

    const linha = `
      <tr>
        <td>${mov.nome}</td>
        <td class="${classeTipo}"> ${tipoFormatado}</td>
        <td>${mov.quantidade}</td>
        <td>${mov.data}</td>
        <td>${mov.destino || "-"}</td>
      </tr>
    `;

    tabela.innerHTML += linha;
  });
}

btnLimpar.addEventListener("click", () => {
  const confirmar = confirm("Tem certeza que deseja apagar todas as movimentações?");

  if (!confirmar) return;

  movimentacoes = [];
  localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

  renderizarMovimentacoes();
});

btnRegistrar.addEventListener("click", () => {
  const produtoId = Number(produtoSelect.value);
  const tipo = tipoSelect.value;
  const quantidade = Number(quantidadeInput.value);
  const destino = destinoInput.value;

  if (!quantidade || quantidade <= 0) {
    alert("Informe uma quantidade válida.");
    return;
  }

  const produto = produtos.find((p) => p.id === produtoId);

  if (tipo === "Saída" && quantidade > produto.quantidade) {
    alert("Estoque insuficiente.");
    return;
  }

  if (tipo === "entrada") {
    produto.quantidade += quantidade;
  } else {
    produto.quantidade -= quantidade;
  }

  const novaMov = {
    nome: produto.nome,
    tipo,
    quantidade,
    destino,
    data: new Date().toLocaleString(),
  };

  movimentacoes.push(novaMov);

  localStorage.setItem("produtos", JSON.stringify(produtos));
  localStorage.setItem("movimentacoes", JSON.stringify(movimentacoes));

  renderizarMovimentacoes();
  quantidadeInput.value = "";

  window.dispatchEvent(new Event("produtosAtualizados"));
});



carregarProdutos();
renderizarMovimentacoes();
