const finalizar =
document.getElementById("finalizar");

finalizar.addEventListener("click",()=>{

const itens =
document.querySelectorAll("#carrinho-itens p");

const total =
document.getElementById("total").innerText;

if(itens.length === 0){

alert("Carrinho vazio!");
return;

}

let mensagem =
"🍺 *DISTRIBUIDORA PRIME* %0A%0A";

mensagem += "🛒 *PEDIDO:* %0A";

itens.forEach((item)=>{

mensagem += "• " + item.innerText + "%0A";

});

mensagem += "%0A💰 *" + total + "*";

mensagem += "%0A%0A🚀 Obrigado pela preferência!";

const numero =
"5534998307604";

window.open(

`https://wa.me/${numero}?text=${mensagem}`,

"_blank"

);

});