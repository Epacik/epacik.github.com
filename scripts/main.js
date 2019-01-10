var isIE = /*@cc_on!@*/!!document.documentMode;

if (isIE) {
    alert('This webpage isn\'t supporting Internet Explorer.\nIf you want to use that page, you have to use newer web browser like:\nGoogle Chrome, Mozilla Firefox, Opera, Apple Safari, Microsoft Edge etc.');
}

console.log('loaded');

/**
 * @function toggleLoading
 * @desc Toggles loading screen
 */
function toggleLoading() {
    loading = document.querySelector('.page-loading');
    if (loading.style.opacity === '0') {
        loading.style.opacity = '';
        loading.style.pointerEvents = '';
        loading.style.transform = "scale(1)";
        document.body.style.overflow = '';
        document.querySelector('.page-loading #spinner div').style.animationName = 'spin';
    } else {
        loading.style.opacity = '0';
        loading.style.pointerEvents = 'none';
        document.body.style.overflow = 'auto';
        loading.style.transform = "scale(2)";
        document.querySelector('.page-loading #spinner div').style.animationName = '';
    }

}

function applyLayout() {
    let layout = document.querySelector(".layoutTemplate").innerHTML;
    let pages = document.querySelectorAll(".subpage");

    for (let i = 0; i < pages.length; i++) {
        let content = pages[i].innerHTML;
        pages[i].innerHTML = layout;
        pages[i].querySelector(".spContent").innerHTML = content;
    }
}

function showPage() {
    let hash = location.hash;
    hash = hash.toLocaleLowerCase();
    hash = hash.replace("#", "");
    hash = hash.split("/");
    let pages = document.querySelectorAll(".subpage");
    let moved = false;
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id === hash[0]) {
            moved = true;
            pages[i].classList.add("show");
        } else {
            pages[i].classList.remove("show");
        }
    }

    let navlinks = document.querySelectorAll(".nav-link");

    for (let i = 0; i < navlinks.length; i++){
        let dest = navlinks[i].href.split("#")[1].split("/")[0];
        if ( hash[0] === "#" || hash[0] === ""){
            hash[0] = "home";
        }
        if (dest === hash[0]) {
            navlinks[i].parentElement.classList.add("active");
        } else {
            navlinks[i].parentElement.classList.remove("active");
        }
    }

    if (!moved) {
        if(hash[0] === "" || hash[0] === "home") {
            document.getElementById("home").classList.add("show");
        } else {
            location.href = "./404.html";
        }
    }
}

function getURLParam(key) {
    let params = new URLSearchParams(location.search);
    return params.get(key);
}

applyLayout();

showPage();

window.addEventListener("hashchange", showPage);

if (getURLParam("debug_loading") === "true"){
    setTimeout(toggleLoading, 3000);
} else {
    toggleLoading();
}

