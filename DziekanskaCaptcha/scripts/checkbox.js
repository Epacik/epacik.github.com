const checkbox = document.querySelector(".checkbox-container");


const checkboxClicked = e => {
    checkbox.classList.add("clicking");
    setTimeout(()=> {
        checkbox.classList.remove("clicking");
    }, 310);
    parent.postMessage(
        "captchaRequested", 
        address
    );
}

checkbox.addEventListener("click", checkboxClicked);

window.addEventListener("message", e => { 
    console.log(e);
 }, false);

const address = location.search.replace("?", "").split("&").find(e => e.startsWith("href")).replace("href=", "");

