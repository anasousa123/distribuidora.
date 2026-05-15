/* =========================
LOADING
========================= */

window.addEventListener("load",()=>{

const loading =
document.getElementById("loading");

if(loading){

setTimeout(()=>{

loading.style.opacity = "0";

setTimeout(()=>{

loading.style.display = "none";

},500);

},1000);

}

});

/* =========================
CARRINHO
========================= */

let carrinho = [];

const carrinhoHTML =
document.getElementById("carrinho-itens");

const totalHTML =
document.getElementById("total");

const finalizar =
document.getElementById("finalizar");

/* =========================
ENTREGA
========================= */

let tipoEntrega = "retirada";

let taxaEntrega = 0;

const btnEntrega =
document.getElementById("btn-entrega");

const btnRetirada =
document.getElementById("btn-retirada");

const enderecoBox =
document.getElementById("endereco-box");

const retiradaBox =
document.getElementById("retirada-box");

const rua =
document.getElementById("rua");

const numero =
document.getElementById("numero");

const referencia =
document.getElementById("referencia");

const bairro =
document.getElementById("bairro");

const taxaHTML =
document.getElementById("taxa");

/* =========================
BOTÃO ENTREGA
========================= */

if(btnEntrega){

btnEntrega.addEventListener("click",()=>{

tipoEntrega = "entrega";

btnEntrega.classList.add("ativo");

btnRetirada.classList.remove("ativo");

enderecoBox.style.display = "block";

retiradaBox.style.display = "none";

atualizarCarrinho();

});

}

/* =========================
BOTÃO RETIRADA
========================= */

if(btnRetirada){

btnRetirada.addEventListener("click",()=>{

tipoEntrega = "retirada";

taxaEntrega = 0;

btnRetirada.classList.add("ativo");

btnEntrega.classList.remove("ativo");

enderecoBox.style.display = "none";

retiradaBox.style.display = "block";

taxaHTML.innerHTML =
"🚚 Taxa de entrega: R$ 0,00";

atualizarCarrinho();

});

}

/* =========================
BAIRRO
========================= */

if(bairro){

bairro.addEventListener("change",()=>{

taxaEntrega =
Number(bairro.value);

taxaHTML.innerHTML =

`🚚 Taxa de entrega:
R$ ${taxaEntrega.toFixed(2)}`;

atualizarCarrinho();

});

}

/* =========================
ADICIONAR CARRINHO
========================= */

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

/* =========================
REMOVER ITEM
========================= */

window.removerItem = function(index){

if(carrinho[index].quantidade > 1){

carrinho[index].quantidade--;

}else{

carrinho.splice(index,1);

}

atualizarCarrinho();

}

/* =========================
ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho(){

if(!carrinhoHTML || !totalHTML) return;

carrinhoHTML.innerHTML = "";

let subtotal = 0;

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

const totalFinal =
subtotal + taxaEntrega;

totalHTML.innerHTML =

`
💰 Total Final:
R$ ${totalFinal.toFixed(2)}
`;

}

/* =========================
FINALIZAR PEDIDO
========================= */

if(finalizar){

finalizar.addEventListener("click",()=>{

if(carrinho.length === 0){

alert("Carrinho vazio!");
return;

}

if(

tipoEntrega === "entrega" &&
(
rua.value === "" ||
numero.value === "" ||
bairro.value === ""
)

){

alert("Preencha os dados de entrega!");
return;

}

let subtotal = 0;

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem +=
"🛒 *PEDIDO:* %0A%0A";

carrinho.forEach((item)=>{

const totalItem =
item.preco * item.quantidade;

subtotal += totalItem;

mensagem +=

`• ${item.nome}
(${item.quantidade}x)
- R$ ${totalItem.toFixed(2)}%0A`;

});

if(tipoEntrega === "entrega"){

mensagem +=
`%0A🚚 *ENTREGA*`;

mensagem +=
`%0A📍 Rua: ${rua.value}`;

mensagem +=
`%0A🏠 Número: ${numero.value}`;

mensagem +=
`%0A📌 Referência: ${referencia.value}`;

mensagem +=
`%0A🏘 Bairro: ${bairro.options[bairro.selectedIndex].text}`;

}else{

mensagem +=
`%0A🏪 *RETIRADA NO LOCAL*`;

mensagem +=
`%0A📍 Av. Principal, 500 - Centro`;

}

const totalFinal =
subtotal + taxaEntrega;

mensagem +=

`%0A%0A💰 *Subtotal: R$ ${subtotal.toFixed(2)}*`;

mensagem +=

`%0A🚚 *Taxa: R$ ${taxaEntrega.toFixed(2)}*`;

mensagem +=

`%0A💵 *Total Final: R$ ${totalFinal.toFixed(2)}*`;

window.open(

`https://wa.me/5531999999999?text=${mensagem}`,

"_blank"

);

});

}

/* =========================
BOTÃO HERO
========================= */

window.irParaCardapio = function(){

const produtos =
document.querySelector(".produtos");

if(produtos){

produtos.scrollIntoView({

behavior:"smooth"

});

}

}

/* =========================
INICIAR
========================= */

atualizarCarrinho();