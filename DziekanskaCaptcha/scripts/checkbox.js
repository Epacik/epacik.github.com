const checkbox = document.querySelector(".checkbox");

const checkboxClicked = e => {
    checkbox.classList.add("clicked");
    setTimeout(()=> {
        checkbox.classList.remove("clicked");
    }, 310);
}

checkbox.addEventListener("click", checkboxClicked);