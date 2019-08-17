function scrTo(panel) {
    if (typeof panel == "string") {
        panel = document.getElementById(panel);
    }
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ToggleNavMenu(button) {
    
}

setInterval(() => {
    
    let cards = document.querySelectorAll(".card.shadow-sm.sm");
    cards.forEach((el) => {
        el.classList.remove("sm");
    })
    let spinner = document.getElementById("contactSpinner");
    if (spinner != null && cards.length != 0) spinner.parentNode.removeChild(spinner);
}, 1000);