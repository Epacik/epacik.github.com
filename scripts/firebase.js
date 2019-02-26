


db.collection('wpisy').where("show", "==", true).orderBy("time", "desc").onSnapshot(snapshot => {
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

db.collection('projects').where("show", "==", true).onSnapshot(snapshot => {
    let ch = snapshot.docChanges();
    ch.forEach(change => {
        if (change.type === "added") {
            addProjectToList(change.doc.id, change.doc.data());
        } else if (change.type === "removed") {
            removeProjectFromList(change.doc.id);
        } else if (change.type === "modified") {
            changeProject(change.doc.id, change.doc.data());
        }
    });
});

db.collection('renders').where("show", "==", true).onSnapshot(snapshot => {
    let ch = snapshot.docChanges();
    ch.forEach(change => {
        if (change.type === "added") {
            addRenderToList(change.doc.id, change.doc.data());
        } else if (change.type === "removed") {
            removeRenderFromList(change.doc.id);
        } else if (change.type === "modified") {
            changeRender(change.doc.id, change.doc.data());
        }
    });
});