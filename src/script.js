let itens = [];
let total = 0;

function adicionar() {
  let produto = document.getElementById("produto").value;
  let qtd = document.getElementById("qtd").value;

  if (qtd == "" || qtd <= 0) {
    alert("Quantidade inválida");
  }

  let preco = 0;

  if (produto == "pastel") preco = 5;
  if (produto == "caldo") preco = 7;
  if (produto == "refrigerante") preco = 4;
  if (produto == "suco") preco = 6;

  let subtotal = preco * qtd;

  itens.push({
    produto: produto,
    qtd: qtd,
    subtotal: subtotal
  });

  atualizarLista();
}

function atualizarLista() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  total = 0;

  for (let i = 0; i < itens.length; i++) {
    let item = itens[i];

    let li = document.createElement("li");
    li.innerHTML = item.produto + " | Qtd: " + item.qtd + " | R$ " + item.subtotal;

    lista.appendChild(li);

    total = total + item.subtotal;
  }

  document.getElementById("total").innerText = total;

  salvarTotal();
}

function salvarTotal() {
  // duplicação de responsabilidade
  localStorage.setItem("total", total);
}

function finalizar() {
  let desconto = 0;

  if (total > 100) {
    desconto = total * 0.2;
  } else if (total > 50) {
    desconto = total * 0.1;
  }

  let taxa = total * 0.05;

  let totalFinal = total - desconto + taxa;

  alert("Total final: " + totalFinal);

  localStorage.setItem("ultimoPedido", totalFinal);

  limparTudo();
}

function limparTudo() {
  itens = [];
  total = 0;

  document.getElementById("lista").innerHTML = "";
  document.getElementById("total").innerText = 0;
}

function removerUltimo() {
  itens.pop();
  atualizarLista();
}

// função duplicada de cálculo (problema proposital)
function calcularTotal() {
  let soma = 0;

  for (let i = 0; i < itens.length; i++) {
    soma += itens[i].subtotal;
  }

  return soma;
}