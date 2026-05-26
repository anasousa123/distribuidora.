import { db } from './firebase.js';

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* CARRINHO */
let carrinho =
JSON.parse(localStorage.getItem("carrinho")) || [];

/* ELEMENTOS */
const carrinhoHTML = document.getElementById("carrinho-itens");
const totalHTML = document.getElementById("total");
const finalizar = document.getElementById("finalizar");

/* OPCIONAIS (evita crash) */
const taxaEntrega = document.getElementById("taxaEntrega");
const subtotalHTML = document.getElementById("subtotal");
const entregaHTML = document.getElementById("entrega");

/* =========================
   ADICIONAR CARRINHO
========================= */
window.adicionarCarrinho = function (nome, preco) {

const item = carrinho.find(i => i.nome === nome);

if (item) {
item.quantidade++;
} else {
carrinho.push({
nome,
preco,
quantidade: 1
});
}

salvarCarrinho();
atualizarCarrinho();

};

/* =========================
   REMOVER ITEM
========================= */
window.removerItem = function (index) {

if (carrinho[index].quantidade > 1) {
carrinho[index].quantidade--;
} else {
carrinho.splice(index, 1);
}

salvarCarrinho();
atualizarCarrinho();

};

/* =========================
   SALVAR LOCAL
========================= */
function salvarCarrinho() {
localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* =========================
   ATUALIZAR UI
========================= */
function atualizarCarrinho() {

if (!carrinhoHTML) return;

carrinhoHTML.innerHTML = "";

let subtotal = 0;

if (carrinho.length === 0) {

carrinhoHTML.innerHTML = `<p class="vazio">Carrinho vazio 🛒</p>`;

if (subtotalHTML) subtotalHTML.innerText = "Subtotal: R$ 0,00";
if (entregaHTML) entregaHTML.innerText = "Entrega: R$ 0,00";

totalHTML.innerText = "💰 Total: R$ 0,00";

return;
}

carrinho.forEach((item, index) => {

const totalItem = item.preco * item.quantidade;
subtotal += totalItem;

carrinhoHTML.innerHTML += `
<div class="item-carrinho">

<div>
<h4>${item.nome}</h4>
<p>${item.quantidade}x • R$ ${totalItem.toFixed(2)}</p>
</div>

<button onclick="removerItem(${index})">❌</button>

</div>
`;

});

const entrega = taxaEntrega ? Number(taxaEntrega.value || 0) : 0;
const total = subtotal + entrega;

if (subtotalHTML) {
subtotalHTML.innerText = `Subtotal: R$ ${subtotal.toFixed(2)}`;
}

if (entregaHTML) {
entregaHTML.innerText = `Entrega: R$ ${entrega.toFixed(2)}`;
}

totalHTML.innerText = `💰 Total: R$ ${total.toFixed(2)}`;

}

/* =========================
   FINALIZAR PEDIDO
========================= */
if (finalizar) {

finalizar.addEventListener("click", async () => {

const cliente = document.getElementById("cliente")?.value?.trim();
const telefone = document.getElementById("telefone")?.value?.trim();
const endereco = document.getElementById("endereco")?.value?.trim();
const observacao = document.getElementById("observacao")?.value?.trim();

if (!cliente) return alert("Digite seu nome!");
if (carrinho.length === 0) return alert("Carrinho vazio!");

/* bloquear botão */
finalizar.disabled = true;
finalizar.innerText = "Enviando...";

let subtotal = 0;

carrinho.forEach(item => {
subtotal += item.preco * item.quantidade;
});

const entrega = taxaEntrega ? Number(taxaEntrega.value || 0) : 0;
const total = subtotal + entrega;

/* ================= FIREBASE ================= */
try {

await addDoc(collection(db, "pedidos"), {
cliente,
telefone,
endereco,
observacao,
itens: carrinho,
subtotal,
entrega,
total,
status: "pendente",
criadoEm: serverTimestamp()
});

} catch (error) {

console.error(error);
alert("Erro ao enviar pedido!");
finalizar.disabled = false;
finalizar.innerText = "FINALIZAR PEDIDO";
return;

}

/* ================= WHATSAPP ================= */

let mensagem = `🍺 *DISTRIBUIDORA PRIME*\n\n`;

mensagem += `👤 Cliente: ${cliente}\n`;
mensagem += `📞 Telefone: ${telefone || "não informado"}\n`;
mensagem += `📍 Endereço: ${endereco || "não informado"}\n\n`;
mensagem += `🛒 *PEDIDO:*\n\n`;

carrinho.forEach(item => {
mensagem += `• ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
});

mensagem += `\n🚚 Entrega: R$ ${entrega.toFixed(2)}`;
mensagem += `\n💰 *Total: R$ ${total.toFixed(2)}*`;

if (observacao) {
mensagem += `\n📝 ${observacao}`;
}

/* encode (IMPORTANTE) */
const url = `https://wa.me/5531999999999?text=${encodeURIComponent(mensagem)}`;

window.open(url, "_blank");

/* LIMPAR */
carrinho = [];
salvarCarrinho();
atualizarCarrinho();

finalizar.disabled = false;
finalizar.innerText = "FINALIZAR PEDIDO";

alert("Pedido enviado 🚀");

});

}

/* =========================
   SCROLL MENU
========================= */
window.irParaCardapio = function () {
document.querySelector(".produtos")
?.scrollIntoView({ behavior: "smooth" });
};

/* =========================
   CATEGORIAS
========================= */
window.abrirCategoria = function (id) {

const categorias = document.querySelectorAll(".categoria-box");

categorias.forEach(cat => cat.style.display = "none");

document.getElementById(id).style.display = "block";

};

/* INIT */
atualizarCarrinho();