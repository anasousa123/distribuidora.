import { db } from './firebase.js';

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const listaProdutos = document.querySelector(".grid-produtos");

let carrinho = [];

async function carregarProdutos(){

const querySnapshot = await getDocs(
collection(db,"produtos")
);

listaProdutos.innerHTML = "";

querySnapshot.forEach((doc)=>{

const produto = doc.data();

listaProdutos.innerHTML += `

<div class="card">

<img src="${produto.imagem}">

<div class="card-content">

<h3>${produto.nome}</h3>

<div class="preco">

R$ ${produto.preco}

</div>

<button onclick="adicionarCarrinho('${produto.nome}', ${produto.preco})">

Adicionar

</button>

</div>

</div>

`;

});

}

window.adicionarCarrinho = function(nome,preco){

carrinho.push({

nome,
preco

});

atualizarCarrinho();

}

function atualizarCarrinho(){

const carrinhoHTML =
document.getElementById("carrinho-itens");

const totalHTML =
document.getElementById("total");

carrinhoHTML.innerHTML = "";

let total = 0;

carrinho.forEach((item)=>{

total += item.preco;

carrinhoHTML.innerHTML += `

<p>

${item.nome} - R$ ${item.preco}

</p>

`;

});

totalHTML.innerHTML = `

Total: R$ ${total.toFixed(2)}

`;

}

document.getElementById("finalizar")
.addEventListener("click",()=>{

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

let mensagem = "🍺 PEDIDO DISTRIBUIDORA PRIME %0A%0A";

carrinho.forEach((item)=>{

mensagem += `• ${item.nome} - R$ ${item.preco}%0A`;

});

window.open(

`https://wa.me/5531999999999?text=${mensagem}`,

"_blank"

);

});

carregarProdutos();