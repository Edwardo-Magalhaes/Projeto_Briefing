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

    // Exemplo de validação adicional
    if (projectBudget <= 0) {
        showMessage('Por favor, insira um orçamento válido.', 'error');
        return;
    }

    // Simulação do envio dos dados do formulário
    const formData = {
        projectTitle,
        projectDescription,
        projectCategory,
        projectDeadline,
        projectBudget,
        clientName,
        clientEmail
    };

    console.log('Formulário enviado com os seguintes dados:', formData);

    // Exibir mensagem de sucesso
    showMessage('Solicitação de projeto enviada com sucesso!', 'success');

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
