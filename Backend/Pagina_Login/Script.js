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
        window.location.href = '/Pagina_Criar_Projeto/Index.html?login=true';
    } else {
        alert('Email ou senha incorretos!');
    }
}
