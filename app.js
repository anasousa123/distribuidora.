const carrinho = [];

const carrinhoHTML =
document.getElementById("carrinho-itens");

const totalHTML =
document.getElementById("total");

const finalizar =
document.getElementById("finalizar");

/* ADICIONAR PRODUTO */

window.adicionarCarrinho = function(nome,preco){

carrinho.push({
nome,
preco
});

atualizarCarrinho();

}

/* REMOVER PRODUTO */

window.removerItem = function(index){

carrinho.splice(index,1);

atualizarCarrinho();

}

/* ATUALIZAR CARRINHO */

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
"Total: R$ 0,00";

return;

}

carrinho.forEach((item,index)=>{

total += item.preco;

carrinhoHTML.innerHTML += `

<div class="item-carrinho">

<div>

<h4>${item.nome}</h4>

<p>R$ ${item.preco.toFixed(2)}</p>

</div>

<button onclick="removerItem(${index})">

❌

</button>

</div>

`;

});

totalHTML.innerHTML =

`Total: R$ ${total.toFixed(2)}`;

}

/* FINALIZAR PEDIDO */

finalizar.addEventListener("click",()=>{

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

let total = 0;

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem += "🛒 *PEDIDO:* %0A";

carrinho.forEach((item)=>{

total += item.preco;

mensagem +=
`• ${item.nome} - R$ ${item.preco.toFixed(2)}%0A`;

});

mensagem +=

`%0A💰 *Total: R$ ${total.toFixed(2)}*`;

mensagem +=
"%0A%0A🚀 Obrigado pela preferência!";

window.open(

`https://wa.me/5531999999999?text=${mensagem}`,

"_blank"

);

});

/* INICIAR */

atualizarCarrinho();

/* BOTÃO HERO */

window.irParaCardapio = function(){

document.querySelector(".produtos")
.scrollIntoView({

behavior:"smooth"

});

}