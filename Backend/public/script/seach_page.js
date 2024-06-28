// Função para alternar a barra lateral
function toggleSidebar(event) {
    event.stopPropagation();
    const sidebar = document.getElementById("sidebar");
    const gridContainer = document.getElementById("grid-container");

    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    } else {
        sidebar.style.width = "250px";
        gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    }
}

// Função para fechar a barra lateral
function closeSidebar(event) {
    const sidebar = document.getElementById("sidebar");
    const gridContainer = document.getElementById("grid-container");

    if (sidebar.style.width === "250px" && !sidebar.contains(event.target) && !event.target.classList.contains('menu-btn')) {
        sidebar.style.width = "0";
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
}

// Função para carregar e exibir projetos
async function carregarProjetos() {
    try {
        const response = await fetch('/projetos');
        const projetos = await response.json();
        
        const gridContainer = document.getElementById("grid-container");
        gridContainer.innerHTML = ''; // Limpa os itens existentes

        projetos.forEach(projeto => {
            const item = document.createElement("div");
            item.classList.add("grid-item");
            item.innerHTML = `
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <p>Categoria: ${projeto.categoria}</p>
                <p>Prazo: ${new Date(projeto.prazo_entrega).toLocaleDateString()}</p>
                <p>Orçamento: R$ ${projeto.orcamento_estimado}</p>
                <p>Cliente: ${projeto.nome_cliente}</p>
                <p>Email: ${projeto.email_cliente}</p>
            `;
            gridContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
    }
}

// Chama a função carregarProjetos quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarProjetos);
