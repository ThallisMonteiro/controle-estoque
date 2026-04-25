const API_URL = 'https://controle-estoque-kvku.onrender.com/api';

let produtos = [];
let categorias = [];
let produtoEditando = null;
const btnAdicionar = document.getElementById("btnAddProduto");
const formProduto = document.getElementById("formProduto");
const btnSalvar = document.getElementById("salvarProduto");
const tbody = document.querySelector(".tabela-produtos tbody");
const inputBusca = document.getElementById("buscarProduto");

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

async function carregarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) throw new Error('Erro ao carregar categorias');
    categorias = await response.json();
    
    const selectCategoria = document.getElementById("categoria");
    selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
    
    categorias.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.nome;
      selectCategoria.appendChild(option);
    });
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function carregarProdutos() {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    if (!response.ok) throw new Error('Erro ao carregar produtos');
    produtos = await response.json();
    renderizarProdutos();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar produtos do servidor');
  }
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
    const precoTotal = produto.quantidade * parseFloat(produto.preco);
    const categoriaNome = produto.categoria?.nome || "Sem categoria";

    const linha = `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>${categoriaNome}</td>
        <td>${produto.quantidade}</td>
        <td>${formatarMoeda(parseFloat(produto.preco))}</td>
        <td>${formatarMoeda(precoTotal)}</td>
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
  document.getElementById("categoria").value = produto.categoria_id || "";
  document.getElementById("quantidade").value = produto.quantidade;
  document.getElementById("precoUnitario").value = parseFloat(produto.preco);

  formProduto.style.display = "flex";

  produtoEditando = id;
}

tbody.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-delete")) {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    const id = Number(event.target.dataset.id);

    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao deletar produto');
      }

      alert('Produto deletado com sucesso!');
      await carregarProdutos();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro: ' + error.message);
    }
  }
});

btnAdicionar.addEventListener("click", () => {
  formProduto.style.display =
    formProduto.style.display === "none" ? "flex" : "none";
});

btnSalvar.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const categoria_id = document.getElementById("categoria").value;
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const preco = parseFloat(document.getElementById("precoUnitario").value);

  if (!nome || !categoria_id || !quantidade || !preco) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  try {
    if (produtoEditando) {
      const response = await fetch(`${API_URL}/produtos/${produtoEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          quantidade,
          preco,
          categoria_id: parseInt(categoria_id)
        })
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao atualizar produto');
      }

      alert('Produto atualizado com sucesso!');
      produtoEditando = null;
    } else {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          quantidade,
          preco,
          categoria_id: parseInt(categoria_id)
        })
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao criar produto');
      }

      alert('Produto criado com sucesso!');
    }

    formProduto.style.display = "none";
    document.getElementById("nome").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("precoUnitario").value = "";
    
    await carregarProdutos();
    window.dispatchEvent(new Event("produtosAtualizados"));
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro: ' + error.message);
  }
});

renderizarProdutos();
carregarCategorias();
carregarProdutos();
inputBusca.addEventListener("input", buscarProdutos);
