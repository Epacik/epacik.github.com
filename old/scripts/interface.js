
const darkmodeButton = document.querySelectorAll("#darkmode-button");
const plainTextRenderer = new Renderer();
function toggleDarkmode() {
    darkMode(localStorage.getItem("darkmode") === "true" ? false : true);
}

function applyLayout() {
    let layout = document.querySelector(".layoutTemplate").innerHTML;
    let pages = document.querySelectorAll(".subpage");
    darkMode(localStorage.getItem("darkmode") === "true"? true : false);

    for (i = 0; i < darkmodeButton.length; i++) {
        darkmodeButton[i].children[0].classList.remove(localStorage.getItem("darkmode") === "true" ? "fa-moon": "fa-sun");
        darkmodeButton[i].children[0].classList.add(localStorage.getItem("darkmode") === "false" ? "fa-moon": "fa-sun");
    }


    for (let i = 0; i < pages.length; i++) {
        let content = pages[i].innerHTML;
        pages[i].innerHTML = layout;
        pages[i].querySelector(".spContent").innerHTML = content;
    }
    document.body.removeChild(document.querySelector(".layoutTemplate"));

    document.querySelector("#home").classList.add("navbar-transparent");

    // document.querySelector("#home .navbar-toggler").addEventListener("click", (e) => {
    //     console.log(e);
    //     if ((window.innerWidth <= 991  && !document.querySelector("#home .navbar-toggler").classList.contains("collapsed")) || window.innerWidth > 991) {
    //         document.querySelector("#home").classList.add("navbar-transparent");
    //     } else {
    //         document.querySelector("#home").classList.remove("navbar-transparent");
    //     }
    // });
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

    let title = typeof data.title === "string" ? JSON.parse(data.title) : data.title;
    let content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;

    let lng = document.querySelector("html").lang;

    if ( title[lng] === undefined || content[lng] === undefined) return;

    if (date > new Date(new Date(Date).getTime() - 60 * 60 * 24 * 1000)) {
        navigator.vibrate([300, 200, 400]);
    }

    i18n.textdomain("other");

    post.insertAdjacentHTML("afterBegin", `<header><h4>${title[lng]}</h4></header><br>
                <div>${marked(content[lng], {renderer: plainTextRenderer}).replace(/^(.{300}[^\s]*).*/, "$1").replace("You can download it here", "").trim() + " <br>" + i18n.gettext("open post")}</div>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`);


    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-JSONDate", JSON.stringify(date));
    post.setAttribute("data-content", content[lng]);
    post.setAttribute("data-title", title[lng]);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
    post.classList.add("sm");
    post.classList.add("post");

    let preloader = document.getElementById("postsPreloader");
    if (preloader) {
        preloader.parentElement.removeChild(preloader)
    }

    post.addEventListener("click", openPost);
    //postList.appendChild(post);
    if (postList.children.length === 0) {
        postList.insertAdjacentElement("beforeEnd", post);
    } else {
        let added = false;
        for (i = 0; i < postList.children.length; i++) {
            if (new Date(postList.children[i].dataset.jsondate.replace('"', "").replace('"', "")) < date) {
                postList.children[i].insertAdjacentElement("beforeBegin", post);
                added = true;
                break;
            }
        }
        if (!added) {
            postList.insertAdjacentElement("beforeEnd", post);
        }
    }
    setTimeout(()=>{
        post.classList.remove("sm")
    }, 100)
}

function removePostFromList(key) {
    let post = document.querySelector(`[data-id="${key}"]`);
    if (!post) return;
    post.classList.add("sm");
    setTimeout(()=> {
        post.parentNode.removeChild(post);
    }, 500);

}

function changePost(key, data) {
    let post = document.querySelector(`[data-id="${key}"]`);
    if (post === null) {
        addPostToList(key, data);
        return;
    }
    let date = new Date(data.time.seconds * 1000);
    let d = {
        hr: ("0" + date.getHours().toString()).slice(-2),
        mn: ("0" + date.getMinutes().toString()).slice(-2),
        mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
        day: (("0" + date.getDate().toString()).slice(-2)),
        yr: date.getFullYear()
    };

    let title = typeof data.title === "string" ? JSON.parse(data.title) : data.title;
    let content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;

    let lng = document.querySelector("html").lang;

    i18n.textdomain("other");
    if ( title[lng] === undefined || content[lng] === undefined) return;
    post.innerHTML = `<header><h5>${title[lng]}</h5></header>
<div>${marked(content[lng], {renderer: plainTextRenderer}).replace(/^(.{300}[^\\s]*).*/, "$1").replace("You can download it here", "").trim() + " <br>" + i18n.gettext("open post")}</div>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`;
    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-JSONDate", JSON.stringify(date));
    post.setAttribute("data-content", content[lng]);
    post.setAttribute("data-title", title[lng]);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
}

function removePostIdFromHash() {
    location.hash = location.hash.split("/")[0];
    $("#postModal").modal("hide");
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
                  <button type="button" class="close" data-dismiss="modal" onclick="window.stop()" aria-label="Close">
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

                let title = typeof data.title === "string" ? JSON.parse(data.title) : data.title;
                let content = typeof data.content === "string" ? JSON.parse(data.content) : data.content;

                let lng = document.querySelector("html").lang;

                postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${title[lng]}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${marked(content[lng])}
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
            //document.querySelector('#postModal .close').addEventListener("click", removePostIdFromHash )

        });
    }
    else {
        target = e.target;
        while (!target.classList.contains("post") || "body" === target.id) {
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
        document.querySelector('#postModal .close').addEventListener("click", removePostIdFromHash)
    }
}

$('#postModal').on('hidden.bs.modal', function (e) {
    removePostIdFromHash();
});

function addProjectToList(key, data) {
    const projects = document.querySelector("#projectsWrapper");
    let desc = JSON.parse(data.description)[document.querySelector("html").lang];
    let alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
    let preloader = document.getElementById("projectsPreloader");
    if (preloader) {
        preloader.parentElement.removeChild(preloader)
    }
    i18n.textdomain("buttons");
    projects.insertAdjacentHTML("afterBegin",
        `<div class="card sm shadow-sm" data-id="${key}" style="width: 18rem;">
                        <img src="${data.pathToImg}" class="card-img-top" alt="${alt}">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${desc}</p>
                            <a href="${data.link}"  class="btn btn-primary">${i18n.gettext("Check it out")}</a>
                        </div>
                </div>`);
    setTimeout(()=>{
        document.querySelector(`[data-id="${key}"]`).classList.remove("sm")
    },100);
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
                                        <a href="${data.link}"  class="btn btn-primary">${i18n.gettext("Check it out")}</a>
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
    let preloader = document.getElementById("rendersPreloader");
    if (preloader) {
        preloader.parentElement.removeChild(preloader)
    }
    try {
        name  = JSON.parse(data.name)[document.querySelector("html").lang];
        desc  = JSON.parse(data.description)[document.querySelector("html").lang];
        alt = JSON.parse(data.imgAlt)[document.querySelector("html").lang];
        tAlt  = JSON.parse(data.thumbnailAlt)[document.querySelector("html").lang];
    } catch (e) {}



    document.querySelector("#rendersWrapper").insertAdjacentHTML("afterBegin",
        `<a href="${data.link ? data.link : ""}" data-id="${key}" class="card sm shadow-sm" style="width: 18rem;">
                    <img src="${data.thumbnail}" class="card-img-top" alt="${tAlt}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${desc}</p>
                    </div>
                </a>`);
    setTimeout(()=>{
        document.querySelector(`[data-id="${key}"]`).classList.remove("sm")
    },100);
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
    } catch (e) {}

    render.innerHTML = `<img src="${data.thumbnail}" class="card-img-top" alt="${tAlt}">
                                        <div class="card-body">
                                            <h5 class="card-title">${name}</h5>
                                            <p class="card-text">${desc}</p>
                                        </div>`;

    render.setAttribute("data-id", key);
    render.setAttribute("href", data.link ? data.link : "")
}

function removeRenderFromList(key) {
    let project = document.querySelector(`[data-id="${key}"]`);
    project.parentNode.removeChild(project);
}

function addContactToList(key, data) {
    let preloader = document.getElementById("contactPreloader");
    if (preloader) {
        preloader.parentElement.removeChild(preloader)
    }
   document.querySelector("#contactCards").insertAdjacentHTML("beforeEnd",
        `<a href="${data.link}" data-id="${key}" target="_blank" class="card shadow-sm sm" style="width: 18rem;">
                    <div class="contact-card card-body">
                        <div class="card-icon"><i class="${data.iconClass}"></i></div>
                        <div>
                            <h5 class="card-title">${data.service}</h5>
                            <p class="card-text">${data.name}</p>
                        </div>
                    </div>
                </a>`);

    setTimeout(()=>{
        document.querySelector(`[data-id="${key}"]`).classList.remove("sm")
    },100);
}

function changeContact(key, data) {
    let cont = document.querySelector(`[data-id="${key}"]`);



    cont.innerHTML = `<div class="contact-card card-body">
                            <div class="card-icon"><i class="${data.iconClass}"></i></div>
                            <div>
                                <h5 class="card-title">${data.service}</h5>
                                <p class="card-text">${data.name}</p>
                            </div>
                        </div> `;

    cont.setAttribute("data-id", key);
    cont.setAttribute("href", data.link);

}

function removeContactFromList(key) {
    let cont = document.querySelector(`[data-id="${key}"]`);
    cont.classList.add("sm");
    setTimeout(()=> {
        cont.parentNode.removeChild(cont);
    }, 500);
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
    let ico = document.querySelectorAll("#darkmodeButton");

    if (enable){
        document.body.classList.add("dark"); //For my css
        let modals = document.querySelectorAll(".modal .modal-content");

        modals.forEach(modal => {
            modal.classList.add("bg-dark");
            modal.classList.add("text-white");
        });
        for (i = 0; i < ico.length; i++) {
            ico[i].children[0].classList.remove("fa-moon");
            ico[i].children[0].classList.add( "fa-sun");
        }
    } else {
        document.body.classList.remove("dark");
        let modals = document.querySelectorAll(".modal .modal-content");

        modals.forEach(modal => {
            modal.classList.remove("bg-dark");
            modal.classList.remove("text-white");
        });
        for (i = 0; i < ico.length; i++) {
            ico[i].children[0].classList.remove("fa-sun");
            ico[i].children[0].classList.add( "fa-moon");
        }
    }
}

setTimeout(()=>{
    let ico = document.querySelectorAll("#darkmodeButton");
    for (i = 0; i < ico.length; i++) {
        if (localStorage.getItem("darkmode") === "true"){
            ico[i].children[0].classList.remove("fa-moon");
            ico[i].children[0].classList.add( "fa-sun");

        } else {
            ico[i].children[0].classList.remove("fa-sun");
            ico[i].children[0].classList.add( "fa-moon");
        }
    }
}, 1000);