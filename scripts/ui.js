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
    

    setTimeout(() => nav.style.height = collapseNavMenu ? "0px" : "318px", 100)
    
    setTimeout(() => {
        nav.classList.toggle("show");
        nav.classList.replace("collapsing", "collapse");
    }, 500);
}

setInterval(() => {
    
    let cards = document.querySelectorAll(".contact.card.shadow-sm.sm");
    cards.forEach((el) => {
        el.classList.remove("sm");
    })
    let spinner = document.getElementById("contactSpinner");
    if (spinner != null && cards.length != 0) spinner.parentNode.removeChild(spinner);
}, 1000);

setInterval(() => {

    let cards = document.querySelectorAll(".proj.card.shadow-sm.sm");
    cards.forEach((el) => {
        el.classList.remove("sm");
    })
    let spinner = document.getElementById("projectsPreloader");
    if (spinner != null && cards.length != 0) spinner.parentNode.removeChild(spinner);
}, 1000);

window.RenderHTML = (id, html) => {
    let container = document.getElementById(id);
    container.innerHTML = html;
}

setInterval(() => {
    let posts = document.querySelectorAll(".post.sm");
    posts.forEach((e) => {
        e.classList.remove("sm");
    });
}, 1000);



window.ToggleDarkMode = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkmode", document.body.classList.contains("dark"));
}