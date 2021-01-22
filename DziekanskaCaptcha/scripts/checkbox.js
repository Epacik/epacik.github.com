const checkbox = document.querySelector(".checkbox");
const address = location.search.replace("?", "").split("&").find(e => e.startsWith("href")).replace("href=", "");

const checkboxClicked = e => {
    checkbox.classList.add("clicked");
    setTimeout(()=> {
        checkbox.classList.remove("clicked");
    }, 310);
    parent.postMessage(
        "The user is 'bob' and the password is 'secret'", 
        address
    );
}

checkbox.addEventListener("click", checkboxClicked);

