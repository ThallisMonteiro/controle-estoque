const API_URL = 'https://controle-estoque-kvku.onrender.com/api';

let produtos = [];
let movimentacoes = [];

const produtoSelect = document.getElementById("produtoSelect");
const tipoSelect = document.getElementById("tipo");
const quantidadeInput = document.getElementById("quantidadeMov");
const destinoInput = document.getElementById("destino");
const tabela = document.getElementById("tabelaMovimentacoes");
const btnRegistrar = document.getElementById("registrarMov");
const btnLimpar = document.getElementById("limparMov");

async function carregarProdutos() {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao carregar produtos');
    produtos = await response.json();
    
    produtoSelect.innerHTML = "";
    produtos.forEach((produto) => {
      const option = document.createElement("option");
      option.value = produto.id;
      option.textContent = produto.nome;
      produtoSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar produtos do servidor');
  }
}


function renderizarMovimentacoes() {
  tabela.innerHTML = "";

  movimentacoes.forEach((mov) => {
    const tipoFormatado = mov.tipo === "saida" ? "Saída" : "Entrada";
    const classeTipo = mov.tipo === "entrada" ? "entrada" : "saida";

    const linha = `
      <tr>
        <td>${mov.produto.nome}</td>
        <td class="${classeTipo}"> ${tipoFormatado}</td>
        <td>${mov.quantidade}</td>
        <td>${new Date(mov.criado_em).toLocaleString('pt-BR')}</td>
        <td>-</td>
      </tr>
    `;

    tabela.innerHTML += linha;
  });
}

async function carregarMovimentacoes() {
  try {
    const response = await fetch(`${API_URL}/movimentacoes`);
    if (!response.ok) throw new Error('Erro ao carregar movimentações');
    movimentacoes = await response.json();
    renderizarMovimentacoes();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar movimentações do servidor');
  }
}

btnLimpar.addEventListener("click", () => {
  const confirmar = confirm("Tem certeza que deseja apagar todas as movimentações?");
  if (!confirmar) return;
  alert("Operação de deletar movimentações em lote não está implementada no backend");
});

btnRegistrar.addEventListener("click", async () => {
  const produtoId = Number(produtoSelect.value);
  const tipo = tipoSelect.value;
  const quantidade = Number(quantidadeInput.value);

  if (!quantidade || quantidade <= 0) {
    alert("Informe uma quantidade válida.");
    return;
  }

  const produto = produtos.find((p) => p.id === produtoId);

  if (tipo === "saida" && quantidade > produto.quantidade) {
    alert("Estoque insuficiente.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/movimentacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        produto_id: produtoId,
        tipo,
        quantidade
      })
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.error || 'Erro ao registrar movimentação');
    }

    const resultado = await response.json();
    alert('Movimentação registrada com sucesso!');
    
    quantidadeInput.value = "";
    await carregarMovimentacoes();
    await carregarProdutos();
    
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro: ' + error.message);
  }
});



carregarProdutos();
carregarMovimentacoes();
