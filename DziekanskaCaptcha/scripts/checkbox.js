const checkbox = document.querySelector(".checkbox");


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

const address = location.search.replace("?", "").split("&").find(e => e.startsWith("href")).replace("href=", "");

