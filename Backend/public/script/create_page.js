document.getElementById('project-request-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        titulo: document.getElementById('project-title').value,
        descricao: document.getElementById('project-description').value,
        categoria: document.getElementById('project-category').value,
        prazo_entrega: document.getElementById('project-deadline').value,
        orcamento_estimado: document.getElementById('project-budget').value,
        nome_cliente: document.getElementById('client-name').value,
        email_cliente: document.getElementById('client-email').value,
        telefone_cliente: document.getElementById('client-telefone').value
    };

    try {
        const response = await fetch('/enviar-solicitacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const projetoCriado = await response.json();
            alert('Solicitação de projeto enviada com sucesso!');
            // Limpar formulário após sucesso
            document.getElementById('project-request-form').reset();
        } else {
            alert('Erro ao enviar solicitação de projeto. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar solicitação de projeto. Por favor, tente novamente mais tarde.');
    }
});
