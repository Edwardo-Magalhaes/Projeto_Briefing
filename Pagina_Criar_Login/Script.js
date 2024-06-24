window.onload = function() {
    // Seleciona os elementos necessários
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Adiciona a classe "active" ao container para mostrar a parte de registro
    container.classList.add("active");

    // Event listener para alternar entre os formulários de login e registro
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
};

function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const tipo = document.getElementById('tipo').value;

    if (nome && email && senha && tipo) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(user => user.email === email)) {
            alert('Email já cadastrado!');
            return;
        }

        users.push({ nome, email, senha, tipo });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Conta criada com sucesso!');
    } else {
        alert('Preencha todos os campos!');
    }
}

function entrar() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
        alert('Login bem-sucedido!');
        // Redireciona para outra página ou realiza alguma ação
        // window.location.href = 'outra_pagina.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}
