import { db } from './firebase.js';

import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ELEMENTOS */

const lista =
document.getElementById("admin-lista");

const salvar =
document.getElementById("salvar");

const nomeInput =
document.getElementById("nome");

const precoInput =
document.getElementById("preco");

const imagemInput =
document.getElementById("imagem");

/* SALVAR PRODUTO */

salvar.addEventListener("click", async()=>{

const nome = nomeInput.value;

const preco = Number(precoInput.value);

const imagem = imagemInput.value;

/* VALIDAÇÃO */

if(!nome || !preco || !imagem){

alert("Preencha todos os campos!");
return;

}

/* LOADING */

salvar.innerHTML = "Salvando...";

try{

await addDoc(collection(db,"produtos"),{

nome,
preco,
imagem

});

alert("✅ Produto cadastrado!");

limparCampos();

carregarProdutos();

}catch(error){

alert("Erro ao salvar produto!");

console.log(error);

}

/* VOLTAR BOTÃO */

salvar.innerHTML = "Salvar Produto";

});

/* LIMPAR */

function limparCampos(){

nomeInput.value = "";

precoInput.value = "";

imagemInput.value = "";

}

/* CARREGAR PRODUTOS */

async function carregarProdutos(){

lista.innerHTML = "";

/* BUSCAR FIREBASE */

const querySnapshot =
await getDocs(collection(db,"produtos"));

querySnapshot.forEach((produto)=>{

const dados = produto.data();

lista.innerHTML += `

<div class="card fade-up">

<img src="${dados.imagem}">

<div class="card-content">

<h3>${dados.nome}</h3>

<div class="preco">

R$ ${dados.preco}

</div>

<div class="admin-buttons">

<button
class="delete-btn"
onclick="deletarProduto('${produto.id}')">

Excluir

</button>

</div>

</div>

</div>

`;

});

}

/* EXCLUIR */

window.deletarProduto = async function(id){

const confirmar =
confirm("Deseja excluir este produto?");

if(!confirmar){

return;

}

await deleteDoc(doc(db,"produtos",id));

alert("🗑 Produto removido!");

carregarProdutos();

}

/* INICIAR */

carregarProdutos();