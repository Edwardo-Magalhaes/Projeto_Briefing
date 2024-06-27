window.onload = function() {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('login')) {
        container.classList.remove("active");
    } else {
        container.classList.add("active");
    }

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

// Função para cadastrar um novo usuário
async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;

    try {
        const response = await fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha, tipo }),
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data);
        alert('Usuário cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Ocorreu um erro ao cadastrar o usuário.');
    }
}

// Função para entrar com login
async function entrar() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data);
        alert('Login realizado com sucesso!');
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao fazer login.');
    }
}
