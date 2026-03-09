let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtoEditando = null;
const btnAdicionar = document.querySelector(".btn-primary");
const formProduto = document.getElementById("formProduto");
const btnSalvar = document.getElementById("salvarProduto");
const tbody = document.querySelector(".tabela-produtos tbody");
const inputBusca = document.getElementById("buscarProduto");

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function buscarProdutos() {
  const termo = removerAcentos(inputBusca.value.toLowerCase().trim());

  if (termo === "") {
    renderizarProdutos();
    return;
  }

  const produtosFiltrados = produtos.filter((produto) => {
    const nomeSemAcento = removerAcentos(produto.nome.toLowerCase());

    return nomeSemAcento.includes(termo);
  });

  renderizarProdutos(produtosFiltrados);
}

function renderizarProdutos(lista = produtos) {
  tbody.innerHTML = "";

  lista.forEach((produto) => {
    const precoTotal = produto.quantidade * produto.precoUnitario;

    const linha = `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${produto.categoria}</td>
        <td>${produto.quantidade}</td>
        <td>R$ ${produto.precoUnitario.toFixed(2)}</td>
        <td>R$ ${precoTotal.toFixed(2)}</td>
        <td>
          <button class="btn-edit" onclick="editarProduto(${produto.id})">Editar</button>
          <button class="btn-delete" data-id="${produto.id}">Excluir</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += linha;
  });
}

function editarProduto(id) {
  const produto = produtos.find((p) => p.id === id);

  document.getElementById("nome").value = produto.nome;
  document.getElementById("categoria").value = produto.categoria;
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("precoUnitario").value = produto.precoUnitario;

  formProduto.style.display = "flex";

  produtoEditando = id;
}

tbody.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-delete")) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    const id = Number(event.target.dataset.id);

    produtos = produtos.filter((produto) => produto.id !== id);

    localStorage.setItem("produtos", JSON.stringify(produtos));

    renderizarProdutos();

    window.dispatchEvent(new Event("produtosAtualizados"));
  }
});

btnAdicionar.addEventListener("click", () => {
  formProduto.style.display =
    formProduto.style.display === "none" ? "flex" : "none";
});

btnSalvar.addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const categoria = document.getElementById("categoria").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const precoUnitario = parseFloat(
    document.getElementById("precoUnitario").value,
  );

  if (!nome || !categoria || !quantidade || !precoUnitario) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    categoria,
    quantidade,
    precoUnitario,
  };

  if (produtoEditando) {
    const produto = produtos.find((p) => p.id === produtoEditando);

    produto.nome = nome;
    produto.categoria = categoria;
    produto.quantidade = quantidade;
    produto.precoUnitario = precoUnitario;

    produtoEditando = null;
  } else {
    const novoProduto = {
      id: produtos.length + 1,
      nome,
      categoria,
      quantidade,
      precoUnitario,
    };

    produtos.push(novoProduto);
  }
  localStorage.setItem("produtos", JSON.stringify(produtos));
  renderizarProdutos();

  window.dispatchEvent(new Event("produtosAtualizados"));

  formProduto.style.display = "none";

  document.getElementById("nome").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("precoUnitario").value = "";
});

renderizarProdutos();
inputBusca.addEventListener("input", buscarProdutos);
