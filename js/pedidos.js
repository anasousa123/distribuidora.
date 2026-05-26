import { db } from './firebase.js';

import {
collection,
getDocs,
query,
orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

/* ELEMENTO */
const lista = document.getElementById("lista-pedidos");

/* =========================
   CARREGAR PEDIDOS
========================= */
async function carregarPedidos() {

if (!lista) return;

lista.innerHTML = "<p>Carregando pedidos...</p>";

try {

/* ordena por criação (mais novo primeiro) */
const q = query(
collection(db, "pedidos"),
orderBy("criadoEm", "desc")
);

const querySnapshot = await getDocs(q);

if (querySnapshot.empty) {
lista.innerHTML = "<p>Nenhum pedido encontrado.</p>";
return;
}

lista.innerHTML = "";

querySnapshot.forEach((pedido) => {

const dados = pedido.data();

lista.innerHTML += `
<div class="carrinho">

<h2>👤 ${dados.cliente || "Sem nome"}</h2>

<p>📞 ${dados.telefone || "Não informado"}</p>

<p>📍 ${dados.endereco || "Não informado"}</p>

<hr>

<p>💰 Total: R$ ${(dados.total || 0).toFixed(2)}</p>

<p>📦 Status: <strong>${dados.status || "pendente"}</strong></p>

<hr>

<h4>🛒 Itens:</h4>

<ul>
${(dados.itens || []).map(item => `
<li>
${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2)}
</li>
`).join("")}
</ul>

</div>
`;
});

} catch (error) {

console.error("Erro ao carregar pedidos:", error);
lista.innerHTML = "<p>Erro ao carregar pedidos.</p>";

}

}

/* INICIAR */
carregarPedidos();