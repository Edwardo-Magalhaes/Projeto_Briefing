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
