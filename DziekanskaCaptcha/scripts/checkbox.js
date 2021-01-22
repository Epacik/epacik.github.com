const checkbox = document.querySelector(".checkbox");

const checkboxClicked = e => {
    checkbox.classList.add("clicked");
    setTimeout(()=> {
        checkbox.classList.remove("clicked");
    }, 310);
    parent.postMessage(
        "The user is 'bob' and the password is 'secret'", 
        parent.location.href
    );
}

checkbox.addEventListener("click", checkboxClicked);

