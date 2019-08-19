function scrTo(panel) {
    if (typeof panel == "string") {
        panel = document.getElementById(panel);
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

let collapseNavMenu = true;

function ToggleNavMenu(button) {
    collapseNavMenu = !collapseNavMenu;
    let nav = document.getElementById(button.dataset.target);
    nav.classList.replace("collapse", "collapsing");
    

    setTimeout(() => nav.style.height = collapseNavMenu ? "0px" : "248px", 100)
    
    setTimeout(() => {
        nav.classList.toggle("show");
        nav.classList.replace("collapsing", "collapse");
    }, 500);
}

setInterval(() => {
    
    let cards = document.querySelectorAll(".card.shadow-sm.sm");
    cards.forEach((el) => {
        el.classList.remove("sm");
    })
    let spinner = document.getElementById("contactSpinner");
    if (spinner != null && cards.length != 0) spinner.parentNode.removeChild(spinner);
}, 1000);

