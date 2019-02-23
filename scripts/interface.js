
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


function openPost(e) {
    //console.log(e);
    let target = e.target;
    while( !target.classList.contains("post") || "body" === target.id ){
        target = target.parentNode;
    }

    let d = JSON.parse(target.dataset.date);

    const postModal = document.getElementById("postModal");
    postModal.children[0].children[0].innerHTML = `<div class="modal-header">
                  <h5 class="modal-title" id="postModalScrollableTitle">${target.dataset.title}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body">
                  ${target.dataset.content}<br><br>
              </div>
              <div class="modal-footer">
                  <b>${target.dataset.author}</b>     &nbsp; ${d.day}/${d.mnt}/${d.yr} ${d.hr}:${d.mn}
              </div>`;
    document.getElementById("openPost").click();
    //console.log(target);
}