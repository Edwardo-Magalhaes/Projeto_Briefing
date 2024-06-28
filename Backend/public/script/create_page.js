document.getElementById('project-request-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos campos do formulário
    const projectTitle = document.getElementById('project-title').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectCategory = document.getElementById('project-category').value;
    const projectDeadline = document.getElementById('project-deadline').value;
    const projectBudget = document.getElementById('project-budget').value;
    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;
    const clientTelefone = document.getElementById('client-telefone').value;

    // Exemplo de validação adicional
    if (projectBudget <= 0) {
        showMessage('Por favor, insira um orçamento válido.', 'error');
        return;
    }

    // Dados a serem enviados para o servidor
    const formData = {
        projectTitle,
        projectDescription,
        projectCategory,
        projectDeadline,
        projectBudget,
        clientName,
        clientEmail,
        clientTelefone
    };

    // Enviar os dados do formulário para o servidor
    fetch('/enviar-solicitacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        showMessage(data.message, 'success');
    })
    .catch(error => {
        console.error('Erro ao enviar solicitação de projeto:', error);
        showMessage('Erro ao enviar solicitação de projeto. Por favor, tente novamente mais tarde.', 'error');
    });

    // Limpar o formulário
    document.getElementById('project-request-form').reset();
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
