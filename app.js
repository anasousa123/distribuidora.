let carrinho = JSON.parse(
localStorage.getItem("carrinho")
) || [];

/* ELEMENTOS */

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

/* SOM */

const audio = new Audio(
"https://www.soundjay.com/buttons/sounds/button-3.mp3"
);

audio.play();

salvarCarrinho();

atualizarCarrinho();

}

/* REMOVER */

window.removerItem = function(index){

if(carrinho[index].quantidade > 1){

carrinho[index].quantidade--;

}else{

carrinho.splice(index,1);

}

salvarCarrinho();

atualizarCarrinho();

}

/* LIMPAR */

window.limparCarrinho = function(){

const confirmar =
confirm("Deseja limpar o carrinho?");

if(!confirmar){

return;

}

carrinho = [];

salvarCarrinho();

atualizarCarrinho();

}

/* SALVAR */

function salvarCarrinho(){

localStorage.setItem(

"carrinho",

JSON.stringify(carrinho)

);

}

/* ATUALIZAR */

function atualizarCarrinho(){

carrinhoHTML.innerHTML = "";

let total = 0;

/* VAZIO */

if(carrinho.length === 0){

carrinhoHTML.innerHTML = `

<p class="vazio">

Seu carrinho está vazio 🛒

</p>

`;

totalHTML.innerHTML =
"Total: R$ 0,00";

return;

}

/* ITENS */

carrinho.forEach((item,index)=>{

const subtotal =
item.preco * item.quantidade;

total += subtotal;

carrinhoHTML.innerHTML += `

<div class="item-carrinho fade-up">

<div>

<h4>${item.nome}</h4>

<p>

${item.quantidade}x •
R$ ${subtotal.toFixed(2)}

</p>

</div>

<div class="acoes">

<button
class="menos"
onclick="removerItem(${index})">

➖

</button>

</div>

</div>

`;

});

/* TOTAL */

totalHTML.innerHTML =

`💰 Total: R$ ${total.toFixed(2)}`;

/* BOTÃO LIMPAR */

carrinhoHTML.innerHTML += `

<button
class="limpar-btn"
onclick="limparCarrinho()">

🗑 Limpar Carrinho

</button>

`;

}

/* FINALIZAR */

finalizar.addEventListener("click",()=>{

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

finalizar.innerHTML =
"Enviando...";

let total = 0;

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem +=
"🛒 *PEDIDO:* %0A%0A";

carrinho.forEach((item)=>{

const subtotal =
item.preco * item.quantidade;

total += subtotal;

mensagem +=

`• ${item.nome} (${item.quantidade}x)
- R$ ${subtotal.toFixed(2)}%0A`;

});

mensagem +=

`%0A💰 *Total: R$ ${total.toFixed(2)}*`;

mensagem +=
"%0A%0A🚀 Obrigado pela preferência!";

/* WHATSAPP */

window.open(

`https://wa.me/5531999999999?text=${mensagem}`,

"_blank"

);

/* RESET */

setTimeout(()=>{

finalizar.innerHTML =
"FINALIZAR PEDIDO";

},1500);

});

/* HERO */

window.irParaCardapio = function(){

document.querySelector(".produtos")
.scrollIntoView({

behavior:"smooth"

});

}

/* LOADING */

window.addEventListener("load",()=>{

const loading =
document.getElementById("loading");

if(loading){

setTimeout(()=>{

loading.style.display = "none";

},1200);

}

});

/* INICIAR */

atualizarCarrinho();