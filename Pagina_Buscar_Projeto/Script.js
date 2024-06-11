function exibirDadosLocalStorage() {
    const todosProjetosDiv = document.getElementById('todosProjetos');
    todosProjetosDiv.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const nomeArquivo = localStorage.key(i);
        const dadosJSON = localStorage.getItem(nomeArquivo);
        const dados = JSON.parse(dadosJSON);

        const projetoDiv = document.createElement('div');
        projetoDiv.className = 'info-box';
        projetoDiv.dataset.categoria = dados.categoria;

        projetoDiv.innerHTML = `
            <p><strong>Categoria:</strong> ${dados.categoria}</p>
            <p><strong>Resumo:</strong> ${dados.resumo}</p>
            <p><strong>Prazo:</strong> ${dados.prazo} dias</p>
            <p><strong>Contato:</strong> ${dados.contato}</p>
            <button class="aceitar-btn" onclick="exibirModal(this)">Aceitar o Projeto</button>
        `;
        todosProjetosDiv.appendChild(projetoDiv);
    }
}

function filtrarProjetosPorCategoria(categoria) {
    const projetos = document.querySelectorAll('.info-box');

    if (categoria === 'all') {
        projetos.forEach(projeto => {
            projeto.style.display = 'block';
        });
    } else {
        projetos.forEach(projeto => {
            if (projeto.dataset.categoria !== categoria) {
                projeto.style.display = 'none';
            } else {
                projeto.style.display = 'block';
            }
        });
    }
}

function exibirModal(button) {
    const projetoDiv = button.parentElement;
    projetoDiv.style.display = 'none';
    exibirMensagemTemporaria('Projeto aceito.', 4000);
}

function exibirMensagemTemporaria(mensagem, tempo) {
    const mensagemTemporaria = document.createElement('div');
    mensagemTemporaria.textContent = mensagem;
    mensagemTemporaria.className = 'mensagem-temporaria';
    document.body.appendChild(mensagemTemporaria);

    setTimeout(() => {
        mensagemTemporaria.remove();
    }, tempo);
}

function exibirProjetosAceitosModal() {
    const modal = document.getElementById('projetosAceitosModal');
    const projetosAceitosContainer = document.getElementById('projetosAceitosContainer');
    projetosAceitosContainer.innerHTML = '';
    const todosProjetos = document.querySelectorAll('.info-box');
    todosProjetos.forEach(projeto => {
        if (projeto.style.display === 'none') {
            const projetoClone = projeto.cloneNode(true);
            projetoClone.querySelector('.aceitar-btn').remove();
            projetosAceitosContainer.appendChild(projetoClone);
        }
    });
    modal.style.display = 'block';
}

function fecharProjetosAceitosModal() {
    const modal = document.getElementById('projetosAceitosModal');
    modal.style.display = 'none';
}

window.addEventListener('load', function () {
    exibirDadosLocalStorage();
    document.getElementById('selecionaCategoria').addEventListener('change', function () {
        filtrarProjetosPorCategoria(this.value);
    });
});