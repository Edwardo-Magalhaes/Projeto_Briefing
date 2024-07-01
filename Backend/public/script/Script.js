function toggleSidebar(event) {
    event.stopPropagation();
    const sidebar = document.getElementById("sidebar");
    const gridContainer = document.getElementById("grid-container");
    
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    } else {
        sidebar.style.width = "250px";
        gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    }
}

function closeSidebar(event) {
    const sidebar = document.getElementById("sidebar");
    const gridContainer = document.getElementById("grid-container");
    
    if (sidebar.style.width === "250px" && !sidebar.contains(event.target) && !event.target.classList.contains('menu-btn')) {
        sidebar.style.width = "0";
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
    }
}

//Lighbox da galeria
// Função para abrir
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const images = document.querySelectorAll('.gallery .image img');
    const lightboxImg = document.querySelector('.lightbox-img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = index; // Move currentIndex para o escopo local

    // Mostrar lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Impede o scroll da página

    // Define a imagem inicial
    showImage(currentIndex);

    // Função para mostrar uma imagem específica
    function showImage(index) {
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;

        // Verifica se é a primeira ou última imagem para habilitar/desabilitar os botões de navegação
        prevBtn.style.display = index === 0 ? 'none' : 'block';
        nextBtn.style.display = index === images.length - 1 ? 'none' : 'block';
    }

    // Função para fechar
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Habilita o scroll da página
    }

    // Função para mudar a imagem
    function changeImage(delta) {
        currentIndex += delta;

        // Verifica se o índice está dentro dos limites
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Vai para a última imagem
        } else if (currentIndex >= images.length) {
            currentIndex = 0; // Vai para a primeira imagem
        }

        showImage(currentIndex);
    }

    // Event listener para fechar a lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Event listeners para os botões de navegação
    prevBtn.addEventListener('click', function() {
        changeImage(-1);
    });

    nextBtn.addEventListener('click', function() {
        changeImage(1);
    });
}

// Event listeners para abrir a lightbox ao clicar nas imagens da galeria
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.gallery .image img').forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
});
