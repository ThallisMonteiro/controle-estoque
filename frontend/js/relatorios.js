// Dados do localStorage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];

// Elementos DOM
const tabelaProdutosRel = document.getElementById("tabelaProdutosRel");
const tabelaMovimentacoesRel = document.getElementById("tabelaMovimentacoesRel");
const tabelaEstoqueBaixoRel = document.getElementById("tabelaEstoqueBaixoRel");
const abaBtns = document.querySelectorAll(".aba-btn");
const abaContents = document.querySelectorAll(".aba-content");
const exportarBtn = document.getElementById("exportarExcel");

// Evento de troca de abas
abaBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const abaName = e.target.dataset.aba;
    mudarAba(abaName);
  });
});

// Exportar para Excel
exportarBtn.addEventListener("click", () => {
  if (typeof XLSX === "undefined") {
    alert("Erro: Biblioteca XLSX não carregou. Por favor, recarregue a página.");
    return;
  }
  exportarParaExcel();
});

function mudarAba(abaName) {
  // Remove classe ativa de todos os botões e conteúdos
  abaBtns.forEach((btn) => btn.classList.remove("ativa"));
  abaContents.forEach((content) => content.classList.remove("ativa"));

  // Encontra e ativa o botão e conteúdo correto
  document
    .querySelector(`[data-aba="${abaName}"]`)
    .classList.add("ativa");
  document.getElementById(`aba-${abaName}`).classList.add("ativa");

  // Carrega dados da aba
  if (abaName === "produtos") {
    carregarRelatoriosProdutos();
  } else if (abaName === "movimentacoes") {
    carregarRelatoriosMovimentacoes();
  } else if (abaName === "estoque-baixo") {
    carregarRelatoriosEstoqueBaixo();
  }
}

// ========== RELATÓRIO DE PRODUTOS ==========

function popularFiltrosCategorias() {
  const filtroCategoria = document.getElementById("filtroCategoriaProdutos");
  const filtroCategoriaEstoqueBaixo = document.getElementById(
    "filtoCategoriaEstoqueBaixo"
  );
  const categorias = [...new Set(produtos.map((p) => p.categoria))];

  [filtroCategoria, filtroCategoriaEstoqueBaixo].forEach((select) => {
    const opcoes = select.querySelectorAll("option:not(:first-child)");
    opcoes.forEach((opt) => opt.remove());

    categorias.forEach((categoria) => {
      const option = document.createElement("option");
      option.value = categoria;
      option.textContent = categoria;
      select.appendChild(option);
    });
  });
}

function popularFiltrosProdutos() {
  const filtroProduto = document.getElementById("filtroProdutoMov");
  const nomeProdutos = [...new Set(produtos.map((p) => p.nome))];

  const opcoes = filtroProduto.querySelectorAll("option:not(:first-child)");
  opcoes.forEach((opt) => opt.remove());

  nomeProdutos.forEach((nome) => {
    const option = document.createElement("option");
    option.value = nome;
    option.textContent = nome;
    filtroProduto.appendChild(option);
  });
}

function carregarRelatoriosProdutos() {
  popularFiltrosCategorias();
  renderizarTabelaProdutos(produtos);
  atualizarEstatísticasProdutos(produtos);
}

function renderizarTabelaProdutos(lista = produtos) {
  tabelaProdutosRel.innerHTML = "";

  lista.forEach((produto) => {
    const precoTotal = produto.quantidade * produto.precoUnitario;
    const status = produto.quantidade <= 5 ? "⚠ Baixo" : "✓ Normal";
    const classStatus = produto.quantidade <= 5 ? "alerta" : "";

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.categoria}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarMoeda(produto.precoUnitario)}</td>
      <td>${formatarMoeda(precoTotal)}</td>
      <td class="${classStatus}">${status}</td>
    `;
    tabelaProdutosRel.appendChild(linha);
  });
}

function atualizarEstatísticasProdutos(lista = produtos) {
  const total = lista.length;
  const valorTotal = lista.reduce(
    (acc, p) => acc + p.quantidade * p.precoUnitario,
    0
  );

  document.getElementById("totalProdutosRel").textContent = total;
  document.getElementById("valorTotalRel").textContent = formatarMoeda(valorTotal);
}

function aplicarFiltrosProdutos() {
  const categoria = document.getElementById("filtroCategoriaProdutos").value;
  const statusEstoque = document.getElementById("filtroEstoqueProdutos").value;
  const busca = document.getElementById("buscarProdutoRel").value.toLowerCase();

  let produtosFiltrados = produtos.filter((produto) => {
    let passou = true;

    if (categoria && produto.categoria !== categoria) {
      passou = false;
    }

    if (statusEstoque === "baixo" && produto.quantidade > 5) {
      passou = false;
    } else if (statusEstoque === "normal" && produto.quantidade <= 5) {
      passou = false;
    } else if (statusEstoque === "alto" && produto.quantidade < 20) {
      passou = false;
    }

    if (busca && !produto.nome.toLowerCase().includes(busca)) {
      passou = false;
    }

    return passou;
  });

  renderizarTabelaProdutos(produtosFiltrados);
  atualizarEstatísticasProdutos(produtosFiltrados);
}

function limparFiltrosProdutos() {
  document.getElementById("filtroCategoriaProdutos").value = "";
  document.getElementById("filtroEstoqueProdutos").value = "";
  document.getElementById("buscarProdutoRel").value = "";
  renderizarTabelaProdutos(produtos);
  atualizarEstatísticasProdutos(produtos);
}

// ========== RELATÓRIO DE MOVIMENTAÇÕES ==========

function carregarRelatoriosMovimentacoes() {
  popularFiltrosProdutos();
  renderizarTabelaMovimentacoes(movimentacoes);
  atualizarEstatísticasMovimentacoes(movimentacoes);
  setarDataAtual();
}

function renderizarTabelaMovimentacoes(lista = movimentacoes) {
  tabelaMovimentacoesRel.innerHTML = "";

  lista.forEach((mov) => {
    const tipoFormatado =
      mov.tipo === "Saída" ? "Saída" : "Entrada";
    const classeTipo =
      mov.tipo === "Entrada" ? "entrada" : "saida";

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${mov.nome}</td>
      <td class="${classeTipo}">${tipoFormatado}</td>
      <td>${mov.quantidade}</td>
      <td>${mov.data}</td>
      <td>${mov.destino || "-"}</td>
    `;
    tabelaMovimentacoesRel.appendChild(linha);
  });
}

function atualizarEstatísticasMovimentacoes(lista = movimentacoes) {
  const total = lista.length;
  let entrada = 0;
  let saida = 0;

  lista.forEach((mov) => {
    if (mov.tipo === "Entrada") {
      entrada += mov.quantidade;
    } else {
      saida += mov.quantidade;
    }
  });

  document.getElementById("totalMovRel").textContent = total;
  document.getElementById("totalEntradaRel").textContent = entrada;
  document.getElementById("totalSaidaRel").textContent = saida;
}

function setarDataAtual() {
  const hoje = new Date();
  const dataFormatada = hoje.toISOString().split("T")[0];
  document.getElementById("filtroDataFim").value = dataFormatada;

  // Define data inicial para 30 dias atrás
  const dataInicial = new Date(hoje);
  dataInicial.setDate(dataInicial.getDate() - 30);
  const dataInicialFormatada = dataInicial.toISOString().split("T")[0];
  document.getElementById("filtroDataInicio").value = dataInicialFormatada;
}

function converterDataParaBR(dataBR) {
  // Converte "15/04/2026 09:30" para Date
  const partes = dataBR.split(" ");
  const dataParte = partes[0]; // "15/04/2026"
  const [dia, mes, ano] = dataParte.split("/");
  return new Date(`${ano}-${mes}-${dia}`);
}

function aplicarFiltrosMovimentacoes() {
  const tipo = document.getElementById("filtroTipoMovimentacao").value;
  const dataInicio = new Date(document.getElementById("filtroDataInicio").value);
  const dataFim = new Date(document.getElementById("filtroDataFim").value);
  const produto = document.getElementById("filtroProdutoMov").value;

  let movimentacoesFiltradas = movimentacoes.filter((mov) => {
    let passou = true;

    if (tipo && mov.tipo !== tipo) {
      passou = false;
    }

    const dataMovimentacao = converterDataParaBR(mov.data);
    if (dataMovimentacao < dataInicio || dataMovimentacao > dataFim) {
      passou = false;
    }

    if (produto && mov.nome !== produto) {
      passou = false;
    }

    return passou;
  });

  renderizarTabelaMovimentacoes(movimentacoesFiltradas);
  atualizarEstatísticasMovimentacoes(movimentacoesFiltradas);
}

function limparFiltrosMovimentacoes() {
  document.getElementById("filtroTipoMovimentacao").value = "";
  document.getElementById("filtroProdutoMov").value = "";
  setarDataAtual();
  renderizarTabelaMovimentacoes(movimentacoes);
  atualizarEstatísticasMovimentacoes(movimentacoes);
}

// ========== RELATÓRIO DE ESTOQUE BAIXO ==========

function carregarRelatoriosEstoqueBaixo() {
  popularFiltrosCategorias();
  renderizarTabelaEstoqueBaixo(produtos);
  atualizarEstatísticasEstoqueBaixo(produtos);
}

function renderizarTabelaEstoqueBaixo(lista = produtos) {
  const limite = parseInt(
    document.getElementById("filtroLimiteBaixo").value || 5
  );

  tabelaEstoqueBaixoRel.innerHTML = "";

  const produtosBaixos = lista.filter((p) => p.quantidade <= limite);

  produtosBaixos.forEach((produto) => {
    let prioridade = "Baixa";
    let classPrioridade = "";

    if (produto.quantidade === 0) {
      prioridade = "CRÍTICA";
      classPrioridade = "critica";
    } else if (produto.quantidade <= limite * 0.5) {
      prioridade = "Alta";
      classPrioridade = "alta";
    } else {
      prioridade = "Média";
      classPrioridade = "media";
    }

    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>${produto.categoria}</td>
      <td><strong>${produto.quantidade}</strong></td>
      <td>${formatarMoeda(produto.precoUnitario)}</td>
      <td class="prioridade ${classPrioridade}">${prioridade}</td>
    `;
    tabelaEstoqueBaixoRel.appendChild(linha);
  });
}

function atualizarEstatísticasEstoqueBaixo(lista = produtos) {
  const limite = parseInt(
    document.getElementById("filtroLimiteBaixo").value || 5
  );
  const total = lista.filter((p) => p.quantidade <= limite).length;

  document.getElementById("totalEstoqueBaixoRel").textContent = total;
}

function aplicarFiltrosEstoqueBaixo() {
  const categoria = document.getElementById("filtoCategoriaEstoqueBaixo").value;
  const limite = parseInt(
    document.getElementById("filtroLimiteBaixo").value || 5
  );

  let produtosFiltrados = produtos.filter((produto) => {
    let passou = true;

    if (categoria && produto.categoria !== categoria) {
      passou = false;
    }

    if (produto.quantidade > limite) {
      passou = false;
    }

    return passou;
  });

  renderizarTabelaEstoqueBaixo(produtosFiltrados);
  atualizarEstatísticasEstoqueBaixo(produtosFiltrados);
}

function limparFiltrosEstoqueBaixo() {
  document.getElementById("filtoCategoriaEstoqueBaixo").value = "";
  document.getElementById("filtroLimiteBaixo").value = "5";
  renderizarTabelaEstoqueBaixo(produtos);
  atualizarEstatísticasEstoqueBaixo(produtos);
}

// ========== FUNÇÕES UTILITÁRIAS ==========

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// ========== EXPORTAÇÃO PARA EXCEL ==========

function exportarParaExcel() {
  const abaAtiva = document.querySelector(".aba-content.ativa").id;
  const tipoRelatorio = abaAtiva.replace("aba-", "");
  let dados = [];
  let nomeArquivo = "";
  let nomeAba = "";
  
  if (tipoRelatorio === "produtos") {
    dados = extrairDadosProdutos();
    nomeArquivo = "Relatório-Produtos";
    nomeAba = "Produtos";
  } else if (tipoRelatorio === "movimentacoes") {
    dados = extrairDadosMovimentacoes();
    nomeArquivo = "Relatório-Movimentações";
    nomeAba = "Movimentações";
  } else if (tipoRelatorio === "estoque-baixo") {
    dados = extrairDadosEstoqueBaixo();
    nomeArquivo = "Relatório-Estoque-Baixo";
    nomeAba = "Estoque Baixo";
  }
  
  if (dados.length === 0) return;
  
  // Criar workbook com SheetJS
  const worksheet = XLSX.utils.json_to_sheet(dados);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, nomeAba);
  
  // Ajustar largura das colunas
  const colWidths = calcularLarguraColunas(dados);
  worksheet["!cols"] = colWidths;
  
  // Gerar nome do arquivo com data
  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR").replace(/\//g, "-");
  const nomeComData = `${nomeArquivo}_${dataFormatada}.xlsx`;
  
  // Fazer download
  XLSX.writeFile(workbook, nomeComData);
}

function extrairDadosProdutos() {
  const tabela = document.getElementById("tabelaProdutosRel");
  const linhas = tabela.querySelectorAll("tr");
  const dados = [];
  
  linhas.forEach((linha, index) => {
    const colunas = linha.querySelectorAll("td");
    if (colunas.length > 0) {
      dados.push({
        ID: colunas[0].textContent.trim(),
        "Nome": colunas[1].textContent.trim(),
        "Categoria": colunas[2].textContent.trim(),
        "Quantidade": colunas[3].textContent.trim(),
        "Preço Unitário": colunas[4].textContent.trim(),
        "Preço Total": colunas[5].textContent.trim(),
        "Status": colunas[6].textContent.trim(),
      });
    }
  });
  
  return dados;
}

function extrairDadosMovimentacoes() {
  const tabela = document.getElementById("tabelaMovimentacoesRel");
  const linhas = tabela.querySelectorAll("tr");
  const dados = [];
  
  linhas.forEach((linha, index) => {
    const colunas = linha.querySelectorAll("td");
    if (colunas.length > 0) {
      dados.push({
        "Produto": colunas[0].textContent.trim(),
        "Tipo": colunas[1].textContent.trim(),
        "Quantidade": colunas[2].textContent.trim(),
        "Data/Hora": colunas[3].textContent.trim(),
        "Destino": colunas[4].textContent.trim(),
      });
    }
  });
  
  return dados;
}

function extrairDadosEstoqueBaixo() {
  const tabela = document.getElementById("tabelaEstoqueBaixoRel");
  const linhas = tabela.querySelectorAll("tr");
  const dados = [];
  
  linhas.forEach((linha, index) => {
    const colunas = linha.querySelectorAll("td");
    if (colunas.length > 0) {
      dados.push({
        "ID": colunas[0].textContent.trim(),
        "Nome": colunas[1].textContent.trim(),
        "Categoria": colunas[2].textContent.trim(),
        "Quantidade": colunas[3].textContent.trim(),
        "Preço Unitário": colunas[4].textContent.trim(),
        "Prioridade": colunas[5].textContent.trim(),
      });
    }
  });
  
  return dados;
}

function calcularLarguraColunas(dados) {
  if (dados.length === 0) return [];
  
  const colunas = Object.keys(dados[0]);
  return colunas.map(col => ({
    wch: Math.max(
      col.length,
      Math.max(...dados.map(d => String(d[col]).length))
    ) + 2
  }));
}

// Carregar relatório de produtos ao iniciar
carregarRelatoriosProdutos();

// Atualizar quando produtos são modificados
window.addEventListener("produtosAtualizados", () => {
  produtos = JSON.parse(localStorage.getItem("produtos")) || [];
  movimentacoes = JSON.parse(localStorage.getItem("movimentacoes")) || [];
  
  const abaAtiva = document.querySelector(".aba-content.ativa").id;
  if (abaAtiva === "aba-produtos") {
    carregarRelatoriosProdutos();
  } else if (abaAtiva === "aba-movimentacoes") {
    carregarRelatoriosMovimentacoes();
  } else if (abaAtiva === "aba-estoque-baixo") {
    carregarRelatoriosEstoqueBaixo();
  }
});
