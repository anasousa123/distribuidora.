/* =========================
CARRINHO DISTRIBUIDORA PRIME
========================= */

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

/* ENTREGA */

const tipoEntrega =
document.getElementById("tipo-entrega");

const enderecoBox =
document.getElementById("endereco-box");

const retiradaBox =
document.getElementById("retirada-box");

const enderecoInput =
document.getElementById("endereco");

const taxaHTML =
document.getElementById("taxa");

/* TAXA */

let taxaEntrega = 0;

/* ALTERAR ENTREGA */

if(tipoEntrega){

tipoEntrega.addEventListener("change",()=>{

if(tipoEntrega.value === "entrega"){

enderecoBox.style.display = "block";

retiradaBox.style.display = "none";

taxaEntrega = 8;

taxaHTML.innerHTML =
`🚚 Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`;

}else{

enderecoBox.style.display = "none";

retiradaBox.style.display = "block";

taxaEntrega = 0;

taxaHTML.innerHTML =
`🚚 Taxa de entrega: R$ ${taxaEntrega.toFixed(2)}`;

}

atualizarCarrinho();

});

}

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

if(!carrinhoHTML || !totalHTML){

return;

}

carrinhoHTML.innerHTML = "";

let subtotal = 0;

/* VAZIO */

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

/* ITENS */

carrinho.forEach((item,index)=>{

const totalItem =
item.preco * item.quantidade;

subtotal += totalItem;

carrinhoHTML.innerHTML += `

<div class="item-carrinho">

<div>

<h4>${item.nome}</h4>

<p>

${item.quantidade}x •
R$ ${totalItem.toFixed(2)}

</p>

</div>

<button onclick="removerItem(${index})">

❌

</button>

</div>

`;

});

/* TOTAL */

const totalFinal =
subtotal + taxaEntrega;

totalHTML.innerHTML =

`
💰 Total Final:
R$ ${totalFinal.toFixed(2)}
`;

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

if(finalizar){

finalizar.addEventListener("click",()=>{

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

/* ENTREGA */

if(

tipoEntrega.value === "entrega" &&
enderecoInput.value === ""

){

alert("Digite o endereço!");
return;

}

let subtotal = 0;

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem +=
"🛒 *PEDIDO:* %0A%0A";

/* ITENS */

carrinho.forEach((item)=>{

const totalItem =
item.preco * item.quantidade;

subtotal += totalItem;

mensagem +=

`• ${item.nome}
(${item.quantidade}x)
- R$ ${totalItem.toFixed(2)}%0A`;

});

/* ENTREGA */

if(tipoEntrega.value === "entrega"){

mensagem +=
`%0A🚚 *Entrega*`;

mensagem +=
`%0A📍 ${enderecoInput.value}`;

}else{

mensagem +=
`%0A🏪 *Retirada no local*`;

mensagem +=
`%0A📍 Av. Principal, 500 - Centro`;

}

/* TOTAL */

const totalFinal =
subtotal + taxaEntrega;

mensagem +=

`%0A%0A💰 *Subtotal: R$ ${subtotal.toFixed(2)}*`;

mensagem +=

`%0A🚚 *Taxa: R$ ${taxaEntrega.toFixed(2)}*`;

mensagem +=

`%0A💵 *Total Final: R$ ${totalFinal.toFixed(2)}*`;

mensagem +=
"%0A%0A🚀 Obrigado pela preferência!";

/* WHATSAPP */

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

/* LOADING */

window.addEventListener("load",()=>{

const loading =
document.getElementById("loading");

setTimeout(()=>{

loading.style.display = "none";

},1200);

});

/* INICIAR */

atualizarCarrinho();