let carrinho = [];

const carrinhoHTML =
document.getElementById("carrinho-itens");

const totalHTML =
document.getElementById("total");

const finalizar =
document.getElementById("finalizar");

/* ADICIONAR */

window.adicionarCarrinho = function(nome,preco){

const itemExistente =
carrinho.find(item => item.nome === nome);

if(itemExistente){

itemExistente.quantidade++;

}else{

carrinho.push({

nome,
preco,
quantidade:1

});

}

atualizarCarrinho();

}

/* REMOVER */

window.removerItem = function(index){

if(carrinho[index].quantidade > 1){

carrinho[index].quantidade--;

}else{

carrinho.splice(index,1);

}

atualizarCarrinho();

}

/* ATUALIZAR */

function atualizarCarrinho(){

carrinhoHTML.innerHTML = "";

let total = 0;

if(carrinho.length === 0){

carrinhoHTML.innerHTML = `

<p class="vazio">

Seu carrinho está vazio 🛒

</p>

`;

totalHTML.innerHTML =
"💰 Total: R$ 0,00";

return;

}

carrinho.forEach((item,index)=>{

const subtotal =
item.preco * item.quantidade;

total += subtotal;

carrinhoHTML.innerHTML += `

<div class="item-carrinho">

<div>

<h4>${item.nome}</h4>

<p>

${item.quantidade}x •
R$ ${subtotal.toFixed(2)}

</p>

</div>

<button onclick="removerItem(${index})">

❌

</button>

</div>

`;

});

totalHTML.innerHTML =

`
💰 Total:
R$ ${total.toFixed(2)}
`;

}

/* FINALIZAR */

finalizar.addEventListener("click",()=>{

const cliente =
document.getElementById("cliente").value;

if(cliente === ""){

alert("Digite seu nome!");
return;

}

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

let total = 0;

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem +=
`👤 Cliente: ${cliente}%0A%0A`;

mensagem +=
"🛒 *PEDIDO:* %0A%0A";

carrinho.forEach((item)=>{

const subtotal =
item.preco * item.quantidade;

total += subtotal;

mensagem +=

`• ${item.nome}
(${item.quantidade}x)
- R$ ${subtotal.toFixed(2)}%0A`;

});

mensagem +=

`%0A💰 *Total: R$ ${total.toFixed(2)}*`;

window.open(

`https://wa.me/5531999999999?text=${mensagem}`,

"_blank"

);

});

/* HERO */

window.irParaCardapio = function(){

document.querySelector(".produtos")
.scrollIntoView({

behavior:"smooth"

});

}

atualizarCarrinho();
window.abrirCategoria = function(id){

const categorias =
document.querySelectorAll(".categoria-box");

categorias.forEach((categoria)=>{

categoria.style.display = "none";

});

document.getElementById(id)
.style.display = "block";

document.getElementById(id)
.scrollIntoView({

behavior:"smooth"

});

}