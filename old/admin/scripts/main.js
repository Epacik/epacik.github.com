var isIE = /*@cc_on!@*/!!document.documentMode;


if (isIE) {
    alert('This webpage isn\'t supporting Internet Explorer.\nIf you want to use that page, you have to use newer web browser like:\nGoogle Chrome, Mozilla Firefox, Opera, Apple Safari, Microsoft Edge etc.');
}

const postList = document.querySelector("#blog .posts");

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



let hash = "";



function showPage() {
    hash = location.hash;
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
    let sec = document.querySelector(`#${hash[0]} #${hash[1]}`);
    if (hash.length === 2 && sec !== null) {
        setTimeout(() => {sec.scrollIntoView({behavior: "smooth", block: "start"});}, 100)

    }

    if (hash[0] === "blog" && hash[1] !== "" && hash[1] !== undefined ){
        openPost(hash[1], true);
    }else {
        $("#postModal").modal("hide");
    }

}

function addCurrentYear() {
    let items = document.querySelectorAll(".curYr");
    for (i = 0; i < items.length; i++) {
        items[i].innerHTML = (new Date()).getFullYear();
    }
}

function scrTo(panel) {
    if (typeof panel == "string"){
        panel = document.getElementById(panel);
    }
    panel.scrollIntoView({behavior: "smooth", block: "start"});
}


function getURLParam(key) {
    let params = new URLSearchParams(location.search);
    return params.get(key);
}

//applyLayout();
addCurrentYear();

showPage();
window.addEventListener("hashchange", showPage);

if (getURLParam("debug_loading") === "true"){
    setTimeout(toggleLoading, 3000);
} else {
    if (hash.length === 2  ) {
        if (document.querySelector(`#${hash[0]} #${hash[1]}`) !== null) {
            showPage();
            scrTo(document.querySelector(`#${hash[0]} #${hash[1]}`));
        } else if (hash[0] === "blog" && hash[1] !== undefined){
            showPage();
            openPost(hash[1], true);
        }


    }

}

function copyAddress() {
    let support = document.getElementById('cpy');
    support.value = location.href;

    document.getElementById("copyM").click();
    support.select();
}



function addTextToClipboard (text) {
    let support = document.getElementById("cpy");
    support.value = text;
    support.select();
    document.execCommand("copy");
    addToast("Copied", `Copied ${text} to clipboard`);
}




auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log("logged in");
        $('#loginModal').modal("hide");
        //document.getElementById("loginMsg").innerHTML = "";
    } else {
        console.log("logged out");
        $('#loginModal').modal({
            backdrop: 'static',
            keyboard: false  // to prevent closing with Esc button (if you want this too)
        });
    }
});


document.getElementById("loginB").addEventListener("click", ()=> {
    auth.signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("password").value).catch(e => {
        console.log("WRONG USER OR PASSWORD");
        document.getElementById("loginMsg").innerHTML =
            `<div class="alert alert-danger" role="alert">
               Wrong user or password
            </div>`;
    });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
});

function logout() {
    auth.signOut();
}

let postData = {};


