let ul = document.querySelector('nav .ul');
let menuItems = document.querySelectorAll('nav .ul a');

function openMenu() {
    ul.classList.add('open');
}

function closeMenu() {
    ul.classList.remove('open');
}

menuItems.forEach(item => {
    item.addEventListener('click', closeMenu);
});

function scrollToSobreNos() {
    document.querySelector('.apresentando').scrollIntoView({ behavior: 'smooth' });
}

function scrollToSection() {
    document.querySelector('.login .container').scrollIntoView({ behavior: 'smooth' });
}
