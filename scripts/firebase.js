


db.collection('wpisy').where("show", "==", true).orderBy("time").onSnapshot(snapshot => {
    let ch = snapshot.docChanges();
    ch.forEach(change => {
        if (change.type === "added") {
            addPostToList(change.doc.id, change.doc.data());
        } else if (change.type === "removed") {
            removePostFromList(change.doc.id);
        } else if (change.type === "modified") {
            changePost(change.doc.id, change.doc.data());
        }
    });
});