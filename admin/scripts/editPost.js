
let editedLang ="";

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

                location.hash = `#blog/${doc.id}`;

                let lng = title[document.querySelector("html").lang] === undefined ? "en" : document.querySelector("html").lang;

                const form = document.forms.editPost;

                let langs = Object.keys(title);

                editedLang = langs[0];

                while (form.langs.length > 0) {
                    form.langs.remove(0)
                }
                langs.forEach(lang => {
                    let option = document.createElement("option");
                    option.value = lang;
                    option.innerText = lang;
                    form.langs.add(option)
                });
                form.title.value = title[form.langs.value];
                form.content.value = content[form.langs.value];
                form.author.value = data.author;
                form.show.value = data.show? "true" : "false";

                postData = {
                    id: doc.id,
                    title: title,
                    content: content,
                    author: data.author,
                    show: data.show,
                    time: data.time,
                }
            }
            $('#editPostModal').modal("show");
        });
    }
    else {
        target = e.target;

        while( !target.classList.contains("post") || "body" === target.id ){
            target = target.parentNode;
        }
        location.hash = `#blog/${target.dataset.id}`;
    }


}


function editPostInDB() {
    const form = document.forms.editPost;
    postData.content[editedLang] = form.content.value;
    postData.title[editedLang] = form.title.value;

    form.lang.value = form.langs.value;
    form.content.value = postData.content[form.langs.value];
    form.title.value = postData.title[form.langs.value];

    // postData.content = JSON.stringify(postData.content);
    // postData.title = JSON.stringify(postData.title);

    postData.show = form.show.value === "true" ? true : false;

    db.collection('wpisy').doc(postData.id).update(postData);
}



function deletePost() {
    if (confirm("Are you sure?")){
        db.collection('wpisy').doc(postData.id).delete();
        document.forms.editPost.reset();
        $("#editPostModal").modal("hide");
    }
}


function changePostLang() {

    const form = document.forms.editPost;
    postData.content[editedLang] = form.content.value;
    postData.title[editedLang] = form.title.value;

    form.lang.value = form.langs.value;
    form.content.value = postData.content[form.langs.value];
    form.title.value = postData.title[form.langs.value];

    editedLang = form.langs.value;
}