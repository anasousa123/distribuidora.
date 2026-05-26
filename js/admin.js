import { db } from './firebase.js';

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ELEMENTOS */
const lista = document.getElementById("admin-lista");
const salvar = document.getElementById("salvar");

const nomeInput = document.getElementById("nome");
const precoInput = document.getElementById("preco");
const imagemInput = document.getElementById("imagem");

/* SALVAR PRODUTO */
salvar.addEventListener("click", async () => {

const nome = nomeInput.value.trim();
const preco = Number(precoInput.value);
const imagem = imagemInput.value.trim();

/* VALIDAÇÃO */
if (!nome || !preco || !imagem) {
alert("Preencha todos os campos!");
return;
}

/* BLOQUEAR BOTÃO */
salvar.disabled = true;
salvar.innerText = "Salvando...";

try {

await addDoc(collection(db, "produtos"), {
nome,
preco,
imagem,
createdAt: new Date()
});

alert("Produto salvo com sucesso ✅");

limparCampos();
carregarProdutos();

} catch (error) {

console.error("Erro ao salvar:", error);
alert("Erro ao salvar produto!");

} finally {

salvar.disabled = false;
salvar.innerText = "Salvar Produto";

}

});

/* LIMPAR CAMPOS */
function limparCampos() {
nomeInput.value = "";
precoInput.value = "";
imagemInput.value = "";
}

/* CARREGAR PRODUTOS */
async function carregarProdutos() {

lista.innerHTML = "<p>Carregando produtos...</p>";

try {

const querySnapshot = await getDocs(collection(db, "produtos"));

if (querySnapshot.empty) {
lista.innerHTML = "<p>Nenhum produto cadastrado.</p>";
return;
}

lista.innerHTML = "";

querySnapshot.forEach((produto) => {

const dados = produto.data();

lista.innerHTML += `
<div class="card">

<img src="${dados.imagem}" />

<div class="card-content">

<h3>${dados.nome}</h3>

<div class="preco">
R$ ${dados.preco.toFixed(2)}
</div>

<button onclick="deletarProduto('${produto.id}')">
Excluir
</button>

</div>

</div>
`;

});

} catch (error) {

console.error("Erro ao carregar:", error);
lista.innerHTML = "<p>Erro ao carregar produtos.</p>";

}

}

/* EXCLUIR PRODUTO */
window.deletarProduto = async function (id) {

const confirmar = confirm("Deseja excluir este produto?");

if (!confirmar) return;

try {

await deleteDoc(doc(db, "produtos", id));
alert("Produto removido 🗑️");

carregarProdutos();

} catch (error) {

console.error("Erro ao excluir:", error);
alert("Erro ao excluir produto!");

}

};

/* INICIAR */
carregarProdutos();