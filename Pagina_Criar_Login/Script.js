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
