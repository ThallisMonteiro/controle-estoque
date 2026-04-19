const API_URL = 'http://localhost:3000/api';

let categorias = [];
let categoriaEditando = null;
const btnAdicionar = document.getElementById("btnAddCategoria");
const formCategoria = document.getElementById("formCategoria");
const btnSalvar = document.getElementById("salvarCategoria");
const tbody = document.querySelector(".tabela-categorias tbody");
const inputBusca = document.getElementById("buscarCategoria");
const totalCategorias = document.getElementById("totalCategorias");

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function carregarCategorias() {
  try {
    const response = await fetch(`${API_URL}/categorias`);
    if (!response.ok) throw new Error('Erro ao carregar categorias');
    categorias = await response.json();
    renderizarCategorias();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar categorias do servidor');
  }
}

function buscarCategorias() {
  const termo = removerAcentos(inputBusca.value.toLowerCase().trim());

  if (termo === "") {
    renderizarCategorias();
    return;
  }

  const categoriasFiltradas = categorias.filter((categoria) => {
    const nomeSemAcento = removerAcentos(categoria.nome.toLowerCase());
    const descricaoSemAcento = removerAcentos((categoria.descricao || "").toLowerCase());
    return nomeSemAcento.includes(termo) || descricaoSemAcento.includes(termo);
  });

  renderizarCategorias(categoriasFiltradas);
}

function renderizarCategorias(lista = categorias) {
  tbody.innerHTML = "";
  totalCategorias.textContent = lista.length;

  lista.forEach((categoria) => {
    const descricao = categoria.descricao || "-";
    const linha = `
      <tr>
        <td>${categoria.id}</td>
        <td>${categoria.nome}</td>
        <td>${descricao}</td>
        <td>
          <button class="btn-edit" onclick="editarCategoria(${categoria.id})">Editar</button>
          <button class="btn-delete" data-id="${categoria.id}">Excluir</button>
        </td>
      </tr>
    `;

    tbody.innerHTML += linha;
  });
}

function editarCategoria(id) {
  const categoria = categorias.find((c) => c.id === id);

  document.getElementById("nome").value = categoria.nome;
  document.getElementById("descricao").value = categoria.descricao || "";

  formCategoria.style.display = "flex";

  categoriaEditando = id;
}

tbody.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-delete")) {
    if (!confirm("Deseja realmente excluir esta categoria?")) return;
    const id = Number(event.target.dataset.id);

    try {
      const response = await fetch(`${API_URL}/categorias/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao deletar categoria');
      }

      alert('Categoria deletada com sucesso!');
      await carregarCategorias();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro: ' + error.message);
    }
  }
});

btnAdicionar.addEventListener("click", () => {
  formCategoria.style.display =
    formCategoria.style.display === "none" ? "flex" : "none";
  
  if (formCategoria.style.display === "flex") {
    categoriaEditando = null;
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.querySelector(".form-categoria h3").textContent = "Nova Categoria";
  }
});

btnSalvar.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;

  if (!nome) {
    alert("Preencha o nome da categoria!");
    return;
  }

  try {
    if (categoriaEditando) {
      const response = await fetch(`${API_URL}/categorias/${categoriaEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao
        })
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao atualizar categoria');
      }

      alert('Categoria atualizada com sucesso!');
      categoriaEditando = null;
    } else {
      const response = await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          descricao
        })
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao criar categoria');
      }

      alert('Categoria criada com sucesso!');
    }

    formCategoria.style.display = "none";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    
    await carregarCategorias();
    window.dispatchEvent(new Event("categoriasAtualizadas"));
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro: ' + error.message);
  }
});

renderizarCategorias();
carregarCategorias();
inputBusca.addEventListener("input", buscarCategorias);

window.addEventListener("categoriasAtualizadas", () => {
  carregarCategorias();
});
