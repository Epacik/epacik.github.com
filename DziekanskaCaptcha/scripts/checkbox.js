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

    const checkbox = document.querySelector(".checkbox");
    if(e.data == "accepted"){
        checkbox.style.backgroundImage = "url(./img/check.png)";
    }
    else{
        checkbox.classList.add("denied");
        setTimeout(()=>{
            checkbox.classList.remove("denied");
        }, 5000);
    }
 }, false);

const address = location.search.replace("?", "").split("&").find(e => e.startsWith("href")).replace("href=", "");

