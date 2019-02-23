
const postList = document.querySelector("#blog .posts");


function addPostToList(key, data) {
    let date = new Date(data.time.seconds * 1000);
    let d = {
        hr: ("0" + date.getHours().toString()).slice(-2),
        mn: ("0" + date.getMinutes().toString()).slice(-2),
        mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
        day: (("0" + date.getDate().toString()).slice(-2)),
    };
    postList.insertAdjacentHTML("beforeEnd",
        `<div class="post" data-id="${key}" data-date="${date.toJSON()}" data-content="${data.content}" 
onclick="openPost('${key}')" ">
                 <header><h5>${data.title}</h5></header>
                 <p><b>${data.author}</b> ${d.day}/${d.mnt}/${date.getFullYear()} ${d.hr}:${d.mn}</p>
               </div>`);
}

function removePostFromList(key) {
    let post = document.querySelector(`[data-id="${key}"]`);
    postList.removeChild(post);
}

function changePost(key, data) {
    let post = document.querySelector(`[data-id="${key}"]`);
    let date = new Date(data.time.seconds * 1000);
    let d = {
        hr: ("0" + date.getHours().toString()).slice(-2),
        mn: ("0" + date.getMinutes().toString()).slice(-2),
        mnt: ("0" + (date.getMonth() + 1).toString()).slice(-2),
        day: (("0" + date.getDate().toString()).slice(-2)),
    };

}

db.collection('wpisy').where("show", "==", true).orderBy("time").onSnapshot(snapshot => {
    let ch = snapshot.docChanges();
    ch.forEach(change => {
        if (change.type === "added") {
            addPostToList(change.doc.id, change.doc.data());
        } else if (change.type === "removed") {
            removePostFromList(change.doc.id);
        } else if (change.type === "modified") {
            modifyPost(change.doc.id, change.doc.data);
        }
    });
});