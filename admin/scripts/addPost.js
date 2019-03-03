function addPostLang() {
    const form = document.forms.addPost;
    if (typeof postData.title !== "object") {
        postData.title = {};
    }
    postData.title[form.lang.value.trim() !== "" ? form.lang.value : "en"] = form.title.value;
    form.title.value = "";


    if (typeof postData.content !== "object") {
        postData.content = {};
    }
    postData.content[form.lang.value.trim() !== "" ? form.lang.value : "en"] = form.content.value;
    form.content.value = "";

    postData.author = form.author.value;

    postData.show = form.show.value === "true" ? true : false;

}

function addPostToDB() {
    const form = document.forms.addPost;
    postData.time = new firebase.firestore.Timestamp.fromDate(new Date());

    if (typeof postData.title !== "object") {
        postData.title = {};
    }
    postData.title[form.lang.value.trim() !== "" ? form.lang.value : "en"] = form.title.value;
    form.title.value = "";


    if (typeof postData.content !== "object") {
        postData.content = {};
    }
    postData.content[form.lang.value.trim() !== "" ? form.lang.value : "en"] = form.content.value;
    form.content.value = "";

    postData.title = JSON.stringify(postData.title);
    postData.content = JSON.stringify(postData.content);
    postData.author = postData.author === undefined ? "Epat" : postData.author;
    postData.show = form.show.value === "true" ? true : false;
    form.reset();
    $('#addPostModal').modal('hide');

    db.collection("wpisy").add(postData).then( function (doc) {
        alert(`Post ID: ${doc.id}` )
    }).catch( function (e) {
        //Error
    });
}