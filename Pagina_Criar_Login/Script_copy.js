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

