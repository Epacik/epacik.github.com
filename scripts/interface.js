
const darkmodeButton = document.querySelectorAll("#darkmode-button");
function toggleDarkmode() {
    darkMode(localStorage.getItem("darkmode") == "true" ? false : true);
    let ico = document.querySelectorAll("#darkmodeButton i");
    for (i = 0; i < darkmodeButton.length; i++) {
        ico[i].classList.remove(localStorage.getItem("darkmode") == "true" ? "fa-moon": "fa-sun");
        ico[i].children[0].classList.add(localStorage.getItem("darkmode") == "false" ? "fa-moon": "fa-sun");
    }

}

function applyLayout() {
    let layout = document.querySelector(".layoutTemplate").innerHTML;
    let pages = document.querySelectorAll(".subpage");
    darkMode(localStorage.getItem("darkmode") == "true"? true : false);

    for (i = 0; i < darkmodeButton.length; i++) {
        darkmodeButton[i].children[0].classList.remove(localStorage.getItem("darkmode") == "true" ? "fa-moon": "fa-sun");
        darkmodeButton[i].children[0].classList.add(localStorage.getItem("darkmode") == "false" ? "fa-moon": "fa-sun");
    }


    for (let i = 0; i < pages.length; i++) {
        let content = pages[i].innerHTML;
        pages[i].innerHTML = layout;
        pages[i].querySelector(".spContent").innerHTML = content;
    }
    document.body.removeChild(document.querySelector(".layoutTemplate"));
}





function addPostToList(key, data) {
    const postList = document.querySelector("#blog .posts");
    let date = new Date(data.time.seconds * 1000);
    let d = {
        hr: ("0" + date.getHours().toString()).slice(-2),
        mn: ("0" + date.getMinutes().toString()).slice(-2),
        mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
        day: (("0" + date.getDate().toString()).slice(-2)),
        yr: date.getFullYear()
    };
    let post = document.createElement("div");

    let title = JSON.parse(data.title)[document.querySelector("html").lang];
    let content = JSON.parse(data.content)[document.querySelector("html").lang];

    post.insertAdjacentHTML("afterBegin", `<header><h5>${title}</h5></header>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`);
    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-content", content);
    post.setAttribute("data-title", title);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
    post.classList.add("sm");
    post.classList.add("post");

    post.addEventListener("click", openPost);
    //postList.appendChild(post);
    postList.insertAdjacentElement("afterBegin", post);
    ;
    setTimeout(()=>{
        post.classList.remove("sm")
    }, 100)
}

function removePostFromList(key) {
    let post = document.querySelector(`[data-id="${key}"]`);
    post.parentNode.removeChild(post);
}

function changePost(key, data) {
    let post = document.querySelector(`[data-id="${key}"]`);
    let date = new Date(data.time.seconds * 1000);
    let d = {
        hr: ("0" + date.getHours().toString()).slice(-2),
        mn: ("0" + date.getMinutes().toString()).slice(-2),
        mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
        day: (("0" + date.getDate().toString()).slice(-2)),
        yr: date.getFullYear()
    };

    let title = JSON.parse(data.title)[document.querySelector("html").lang];
    let content = JSON.parse(data.content)[document.querySelector("html").lang];

    post.innerHTML = `<header><h5>${data.title}</h5></header>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`;
    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-content", content);
    post.setAttribute("data-title", title);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
}


function removePostIdFromHash() {
    location.hash = location.hash.split("/")[0];
}


function openPost(e, isNotEvent) {
    //console.log(e);
    let target;
    const postModal = document.getElementById("postModal");
    if (hash[0] !== "blog") {
        return;
    }
    if (isNotEvent) {
        location.hash = `#blog/${e}`;
        db.collection("wpisy").doc(e).get().then(doc => {
            if (doc._document == null) {
                i18n.textdomain("errors");

                postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle"></h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${i18n.gettext("missing post")}
              </div>
              <div class="modal-footer">
                  <b>Epat</b> 
              </div>`;
            }
            else {
                let data = doc.data();


                let date = new Date(data.time.seconds * 1000);
                let d = {
                    hr: ("0" + date.getHours().toString()).slice(-2),
                    mn: ("0" + date.getMinutes().toString()).slice(-2),
                    mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
                    day: (("0" + date.getDate().toString()).slice(-2)),
                    yr: date.getFullYear()
                };

                let title = JSON.parse(data.title)[document.querySelector("html").lang];
                let content = JSON.parse(data.content)[document.querySelector("html").lang];

                postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${marked(content)}
              </div>
              <div class="modal-footer">
                  <button class="btn btn-outline-secondary" onclick="copyAddress()"><i 
                 class="fas fa-share"></i></button><b>
${data.author}</b>   
                    &nbsp; ${d.day}/${d.mnt}/${d.yr} 
${d.hr}:${d.mn}
              </div>`;

            }
            document.getElementById("openPost").click();
            document.querySelector('#postModal .close').addEventListener("click", removePostIdFromHash )
        });
    }
    else {
        target = e.target;
        while( !target.classList.contains("post") || "body" === target.id ){
            target = target.parentNode;
        }
        let d = JSON.parse(target.dataset.date);


        location.hash = `#blog/${target.dataset.id}`;

        postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${target.dataset.title}</h5>
                  <button type="button"  class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${marked(target.dataset.content)}
              </div>
              <div class="modal-footer">
                  <button class="btn btn-outline-secondary" onclick="copyAddress()"><i class="fas fa-share"></i></button><b>
${target.dataset.author}</b>     &nbsp; ${d.day}/${d.mnt}/${d.yr} ${d.hr}:${d.mn}
              </div>`;
        document.getElementById("openPost").click();
        //console.log(target);
        document.querySelector('#postModal .close').addEventListener("click", removePostIdFromHash )
    }


}








function addProjectToList(key, data) {
    const projects = document.querySelector("#projectsWrapper");
    let desc = JSON.parse(data.description)[document.querySelector("html").lang];
    let alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
    i18n.textdomain("buttons");
    projects.insertAdjacentHTML("afterBegin",
        `<div class="card shadow-sm" data-id="${key}" style="width: 18rem;">
                        <img src="${data.pathToImg}" class="card-img-top" alt="${alt}">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${desc}</p>
                            <a href="${data.link}" target="_blank" class="btn btn-primary">${i18n.gettext("Check it out")}</a>
                        </div>
                </div>`);
}


function changeProject(key, data) {
    let project = document.querySelector(`[data-id="${key}"]`);
    i18n.textdomain("buttons");
    let desc = JSON.parse(data.description)[document.querySelector("html").lang];
    let alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
    project.innerHTML = `<img src="${data.pathToImg}" class="card-img-top" alt="${alt}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">${desc}</p>
                                        <a href="${data.link}" target="_blank" class="btn btn-primary">${i18n.gettext("Check it out")}</a>
                                    </div>`;

    project.setAttribute("data-id", key);
}

function removeProjectFromList(key) {
    let project = document.querySelector(`[data-id="${key}"]`);
    project.parentNode.removeChild(project);
}










function addRenderToList(key, data) {
    let name = "";
    let desc = "";
    let alt = "";
    let tAlt = "";
    try {
        name  = JSON.parse(data.name)[document.querySelector("html").lang];
        desc  = JSON.parse(data.description)[document.querySelector("html").lang];
        alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
        tAlt  = JSON.parse(data.thumbnailAlt)[document.querySelector("html").lang];
    } catch {}



    document.querySelector("#rendersWrapper").insertAdjacentHTML("afterBegin",
        `<div data-id="${key}" class="card shadow-sm" style="width: 18rem;">
                    <img src="${data.thumbnail}" class="card-img-top" alt="${tAlt}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${desc}</p>
                    </div>
                </div>`);
}

function changeRender(key, data) {
    let render = document.querySelector(`[data-id="${key}"]`);

    let name = "";
    let desc = "";
    let alt = "";
    let tAlt = "";
    try {
        name  = JSON.parse(data.name)[document.querySelector("html").lang];
        desc  = JSON.parse(data.description)[document.querySelector("html").lang];
        alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
        tAlt  = JSON.parse(data.thumbnailAlt)[document.querySelector("html").lang];
    } catch {}

    render.innerHTML = `<img src="${data.thumbnail}" class="card-img-top" alt="${tAlt}">
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <p class="card-text">${desc}</p>
                                        </div>`;

    render.setAttribute("data-id", key);
}

function removeRenderFromList(key) {
    let project = document.querySelector(`[data-id="${key}"]`);
    project.parentNode.removeChild(project);
}

function addToast(title, message) {
    const toastWrapper = document.querySelector(".toasts").children[0];
    toastWrapper.insertAdjacentHTML("beforeEnd",
        `<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
                      <div class="toast-header">
                        <strong class="mr-auto">${title}</strong>
                        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="toast-body">
                        ${message}
                      </div>
                    </div>`);
    if (toastWrapper.children.length > 0) {
       $( toastWrapper.children[toastWrapper.children.length - 1]).toast('show');
    }
}





function darkMode(enable) {
    localStorage.setItem("darkmode", enable);

    if (enable){
        document.body.classList.add("dark"); //For my css
        document.querySelector("#postModal .modal-content").classList.add("bg-dark");
        document.querySelector("#copyModal .modal-content").classList.add("bg-dark");
        document.querySelector("#postModal .modal-content").classList.add("text-white");
        document.querySelector("#copyModal .modal-content").classList.add("text-white");
    } else {
        document.body.classList.remove("dark");
        document.querySelector("#postModal .modal-content").classList.remove("bg-dark");
        document.querySelector("#copyModal .modal-content").classList.remove("bg-dark");
        document.querySelector("#postModal .modal-content").classList.remove("text-white");
        document.querySelector("#copyModal .modal-content").classList.remove("text-white");
    }
}

