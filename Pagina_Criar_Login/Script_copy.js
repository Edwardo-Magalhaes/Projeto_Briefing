// Script_copy.js

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

    // Função para cadastrar novo usuário
    async function cadastrar() {
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const tipo = document.getElementById('tipo').value;

        try {
            const response = await fetch('http://localhost:3000/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, email, senha, tipo }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Cadastro realizado com sucesso!\nBem-vindo(a), ${data.nome}!`);
                container.classList.remove("active"); // Esconder formulário de cadastro após sucesso
            } else {
                alert('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário');
        }
    }

    // Função para realizar login
    async function entrar() {
        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Bem-vindo(a) de volta, ${data.nome}!`);
                container.classList.remove("active"); // Esconder formulário de login após sucesso
                // Aqui você pode redirecionar o usuário para a próxima tela ou executar ações adicionais
            } else {
                alert('Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao realizar login');
        }
    }

    // Adicionar eventos de clique para os botões de cadastro e login
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário
        cadastrar();
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita o envio padrão do formulário
        entrar();
    });
};
