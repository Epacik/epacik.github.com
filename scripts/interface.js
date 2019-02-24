
function applyLayout() {
    let layout = document.querySelector(".layoutTemplate").innerHTML;
    let pages = document.querySelectorAll(".subpage");

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

    post.insertAdjacentHTML("afterBegin", `<header><h5>${data.title}</h5></header>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`);
    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-content", data.content);
    post.setAttribute("data-title", data.title);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
    post.classList.add("post");
    post.addEventListener("click", openPost);
    //postList.appendChild(post);
    postList.insertAdjacentElement("afterBegin", post);
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
    post.innerHTML = `<header><h5>${data.title}</h5></header>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>`;
    post.setAttribute("data-date", JSON.stringify(d));
    post.setAttribute("data-content", data.content);
    post.setAttribute("data-title", data.title);
    post.setAttribute("data-author", data.author);
    post.setAttribute("data-id", key);
}


function openPost(e, isNotEvent) {
    //console.log(e);
    let target;
    const postModal = document.getElementById("postModal");
    if (hash[0] !== "blog") {
        return;
    }
    if (isNotEvent) {
        db.collection("wpisy").doc(e).get().then(doc => {
            if (doc._document == null) {
                postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">Not found</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  Unfortunately, the post you are looking for does not exist.<br> Check if you entered the correct 
                  URL<br><br>
              </div>
              <div class="modal-footer">
                  <b>Epat</b>
              </div>`;
            } else {
                let data = doc.data();

                let date = new Date(data.time.seconds * 1000);
                let d = {
                    hr: ("0" + date.getHours().toString()).slice(-2),
                    mn: ("0" + date.getMinutes().toString()).slice(-2),
                    mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
                    day: (("0" + date.getDate().toString()).slice(-2)),
                    yr: date.getFullYear()
                };

                postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${data.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${marked(data.content)}<br><br>
              </div>
              <div class="modal-footer">
                  <b>${data.author}</b>     &nbsp; ${d.day}/${d.mnt}/${d.yr} ${d.hr}:${d.mn}
              </div>`;

            }
            document.getElementById("openPost").click();
        });
    }
    else {
        target = e.target;
        while( !target.classList.contains("post") || "body" === target.id ){
            target = target.parentNode;
        }
        let d = JSON.parse(target.dataset.date);


        postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${target.dataset.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${marked(target.dataset.content)}<br><br>
              </div>
              <div class="modal-footer">
                  <b>${target.dataset.author}</b>     &nbsp; ${d.day}/${d.mnt}/${d.yr} ${d.hr}:${d.mn}
              </div>`;
        document.getElementById("openPost").click();
        //console.log(target);
    }


}








function addProjectToList(key, data) {
    const projects = document.querySelector("#projectsWrapper");

    projects.insertAdjacentHTML("afterBegin",
        `<div class="card shadow-sm" data-id="${key}" style="width: 18rem;">
                        <img src="${data.pathToImg}" class="card-img-top" alt="${data.imgAlt}">
                        <div class="card-body">
                            <h5 class="card-title">${data.name}</h5>
                            <p class="card-text">${data.description}</p>
                            <a href="${data.link}" target="_blank" class="btn btn-primary">Check it out</a>
                        </div>
                </div>`);
}


function changeProject(key, data) {
    let project = document.querySelector(`[data-id="${key}"]`);

    project.innerHTML = `<img src="${data.pathToImg}" class="card-img-top" alt="${data.imgAlt}">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.name}</h5>
                                        <p class="card-text">${data.description}</p>
                                        <a href="${data.link}" target="_blank" class="btn btn-primary">Check it out</a>
                                    </div>`;

    project.setAttribute("data-id", key);
}

function removeProjectFromList(key) {
    let project = document.querySelector(`[data-id="${key}"]`);
    project.parentNode.removeChild(project);
}










function addRenderToList(key, data) {
    document.querySelector("#rendersWrapper").insertAdjacentHTML("afterBegin",
        `<div data-id="${key}" class="card shadow-sm" style="width: 18rem;">
                    <img src="${data.thumbnail}" class="card-img-top" alt="${data.thumbnailAlt}">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.description}</p>
                    </div>
                </div>`);
}

function changeRender(key, data) {
    let render = document.querySelector(`[data-id="${key}"]`);

    render.innerHTML = `<img src="${data.thumbnail}" class="card-img-top" alt="${data.thumbnailAlt}">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.name}</h5>
                                            <p class="card-text">${data.description}</p>
                                        </div>`;

    render.setAttribute("data-id", key);
}

function removeRenderFromList(key) {
    let project = document.querySelector(`[data-id="${key}"]`);
    project.parentNode.removeChild(project);
}