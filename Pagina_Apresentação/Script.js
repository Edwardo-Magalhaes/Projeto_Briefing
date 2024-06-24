let ul = document.querySelector('nav .ul');
let menuItems = document.querySelectorAll('nav .ul a'); // Seleciona todos os itens da lista

function openMenu() {
    ul.classList.add('open');
}

function closeMenu() {
    ul.classList.remove('open');
}

// Adiciona um event listener a cada item da lista para fechar o menu ao ser clicado
menuItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

function scrollToSobreNos() {
    document.querySelector('.apresentando').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection() {
    document.querySelector('.login .container').scrollIntoView({ behavior: 'smooth' });
}
