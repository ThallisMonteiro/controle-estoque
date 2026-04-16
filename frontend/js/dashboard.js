const tabelaMovimentacoes = document.getElementById("tabelaMovimentacoes");

// Cores para os gráficos
const CORES_GRAFICOS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
  "#F8B88B",
  "#A2D5C6",
];

let charts = {
  categorias: null,
  movimentacoes: null,
  produtosMostrados: null,
  evolucao: null,
};

function carregarUltimasMovimentacoes() {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

  tabelaMovimentacoes.innerHTML = "";

  const ultimas = movimentacoes.slice(-10).reverse();

  ultimas.forEach((mov) => {
    const linha = document.createElement("tr");

    const tipoFormatado =
      mov.tipo === "Saída" ? "Saída" : "Entrada";

    linha.innerHTML = `
      <td>${mov.nome}</td>
      <td class="${mov.tipo === "Entrada" ? "entrada" : "saida"}">${tipoFormatado}</td>
      <td>${mov.quantidade}</td>
      <td>${mov.data}</td>
      <td>${mov.destino || "-"}</td>
    `;

    tabelaMovimentacoes.appendChild(linha);
  });
}

function criarGraficoCategorias() {
  const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  const contexto = document.getElementById("graficoCategorias");

  // Agrupar por categoria
  const categorias = {};
  produtos.forEach((produto) => {
    if (!categorias[produto.categoria]) {
      categorias[produto.categoria] = 0;
    }
    categorias[produto.categoria]++;
  });

  const labels = Object.keys(categorias);
  const dados = Object.values(categorias);

  if (charts.categorias) {
    charts.categorias.destroy();
  }

  charts.categorias = new Chart(contexto, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: dados,
          backgroundColor: CORES_GRAFICOS.slice(0, labels.length),
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 12,
            },
          },
        },
      },
    },
  });
}

function criarGraficoMovimentacoes() {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
  const contexto = document.getElementById("graficoMovimentacoes");

  let entrada = 0;
  let saida = 0;

  movimentacoes.forEach((mov) => {
    if (mov.tipo === "Entrada") {
      entrada += mov.quantidade;
    } else {
      saida += mov.quantidade;
    }
  });

  if (charts.movimentacoes) {
    charts.movimentacoes.destroy();
  }

  charts.movimentacoes = new Chart(contexto, {
    type: "bar",
    data: {
      labels: ["Entrada", "Saída"],
      datasets: [
        {
          label: "Quantidade",
          data: [entrada, saida],
          backgroundColor: ["#4ECDC4", "#FF6B6B"],
          borderColor: ["#2a9d8f", "#d32f2f"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return Math.floor(value);
            },
          },
        },
      },
    },
  });
}

function criarGraficoProdutosMostrados() {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
  const contexto = document.getElementById("graficoProdutosMostrados");

  // Contar movimentações por produto
  const produtosCount = {};
  movimentacoes.forEach((mov) => {
    if (!produtosCount[mov.nome]) {
      produtosCount[mov.nome] = 0;
    }
    produtosCount[mov.nome] += mov.quantidade;
  });

  // Ordenar e pegar top 5
  const top5 = Object.entries(produtosCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const labels = top5.map((item) => item[0]);
  const dados = top5.map((item) => item[1]);

  if (charts.produtosMostrados) {
    charts.produtosMostrados.destroy();
  }

  charts.produtosMostrados = new Chart(contexto, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantidade Movimentada",
          data: dados,
          backgroundColor: "#45B7D1",
          borderColor: "#1976D2",
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function (value) {
              return Math.floor(value);
            },
          },
        },
      },
    },
  });
}

function criarGraficoEvolucao() {
  const movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
  const contexto = document.getElementById("graficoEvolucao");

  // Criar array de últimos 30 dias
  const today = new Date();
  const ultimos30Dias = [];

  for (let i = 29; i >= 0; i--) {
    const data = new Date(today);
    data.setDate(data.getDate() - i);
    ultimos30Dias.push(data.toLocaleDateString("pt-BR"));
  }

  // Simular evolução do estoque por dia
  const dados = ultimos30Dias.map((dia, index) => {
    // Simular variação do estoque
    const baseValue = 500;
    const variacao = Math.sin(index / 5) * 100 + Math.random() * 50;
    return Math.max(100, baseValue + variacao);
  });

  if (charts.evolucao) {
    charts.evolucao.destroy();
  }

  charts.evolucao = new Chart(contexto, {
    type: "line",
    data: {
      labels: ultimos30Dias,
      datasets: [
        {
          label: "Quantidade em Estoque",
          data: dados,
          borderColor: "#4ECDC4",
          backgroundColor: "rgba(78, 205, 196, 0.1)",
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#4ECDC4",
          pointBorderColor: "#2a9d8f",
          pointBorderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return Math.floor(value);
            },
          },
        },
        x: {
          display: true,
          ticks: {
            maxTicksLimit: 10,
          },
        },
      },
    },
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

  // Criar gráficos
  criarGraficoCategorias();
  criarGraficoMovimentacoes();
  criarGraficoProdutosMostrados();
  criarGraficoEvolucao();
}

atualizarDashboard();

// Atualizar dashboard quando produtos são modificados
window.addEventListener("produtosAtualizados", atualizarDashboard);
