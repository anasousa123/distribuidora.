import { db } from './firebase.js';

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const salvar = document.getElementById("salvar");

const lista = document.getElementById("admin-lista");

salvar.addEventListener("click", async()=>{

    const nome = document.getElementById("nome").value;

    const preco = Number(
        document.getElementById("preco").value
    );

    const imagem = document.getElementById("imagem").value;

    if(!nome || !preco || !imagem){

        alert("Preencha tudo!");
        return;
    }

    await addDoc(collection(db,"produtos"),{

        nome,
        preco,
        imagem
    });

    alert("Produto salvo!");

    carregarProdutos();
});

async function carregarProdutos(){

    lista.innerHTML = "";

    const querySnapshot = await getDocs(
        collection(db,"produtos")
    );

    querySnapshot.forEach((produto)=>{

        const dados = produto.data();

        lista.innerHTML += `
        
        <div class="card">

            <img src="${dados.imagem}">

            <div class="card-content">

                <h3>${dados.nome}</h3>

                <p>R$ ${dados.preco}</p>

                <button onclick="deletar('${produto.id}')">

                    Excluir

                </button>

            </div>

        </div>
        
        `;
    });
}

window.deletar = async function(id){

    await deleteDoc(doc(db,"produtos",id));

    carregarProdutos();
}

carregarProdutos();