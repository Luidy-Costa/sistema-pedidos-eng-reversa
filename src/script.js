import { ProductFactory } from './ProductFactory.js';
import { OrderManager } from './OrderManager.js';

const orderManager = OrderManager.getInstance();

// Função global para o HTML (agora apenas delega para os módulos)
window.adicionar = () => {
    const type = document.getElementById("produto").value;
    const qtd = parseInt(document.getElementById("qtd").value);

    if (isNaN(qtd) || qtd <= 0) {
        alert("Quantidade inválida");
        return;
    }

    const newProduct = ProductFactory.createProduct(type, qtd);
    orderManager.addItem(newProduct);
    
    atualizarInterface();
};

window.finalizar = () => {
    const total = orderManager.calculateTotal();
    if (total === 0) return alert("O pedido está vazio!");

    let desconto = 0;
    if (total > 100) desconto = total * 0.2;
    else if (total > 50) desconto = total * 0.1;

    const taxa = total * 0.05;
    const totalFinal = total - desconto + taxa;

    alert(`Total final: R$ ${totalFinal.toFixed(2)}`);
    localStorage.setItem("ultimoPedido", totalFinal);
    
    orderManager.clear();
    atualizarInterface();
};

function atualizarInterface() {
    const listaUI = document.getElementById("lista");
    const totalUI = document.getElementById("total");
    
    listaUI.innerHTML = "";
    
    orderManager.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} | Qtd: ${item.quantity} | R$ ${item.subtotal}`;
        listaUI.appendChild(li);
    });

    totalUI.innerText = orderManager.calculateTotal().toFixed(2);
}