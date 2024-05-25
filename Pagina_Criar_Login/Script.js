const container = document.getElementById('container');
const registerBtn = document.getElementById('register'); // Certifique-se de usar o id correto aqui
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
