let db
window.initFirebase = () => {
    var config = {
        apiKey: "AIzaSyCo61ez5fN6_hmXsq-0yaSHKunjRnbtkvo",
        authDomain: "epacik-github-io-db.firebaseapp.com",
        databaseURL: "https://epacik-github-io-db.firebaseio.com",
        projectId: "epacik-github-io-db",
        storageBucket: "epacik-github-io-db.appspot.com",
        messagingSenderId: "11190278297"
    };

    firebase.initializeApp(config);

    db = firebase.firestore();

    db.settings({});

    db.collection('contact').where("allow", "==", true).where("show", "==", true).orderBy("name").onSnapshot(snapshot => {
        let ch = snapshot.docChanges();
        ch.forEach(change => {
            if (change.type === "added") {
                DotNet.invokeMethod("LandingPage", "firebaseAddContact", change.doc.id, JSON.stringify(change.doc.data()));
            } else if (change.type === "removed") {
                //removeContactFromList(change.doc.id);
                DotNet.invokeMethod("LandingPage", "firebaseRemoveContact", change.doc.id);
            } else if (change.type === "modified") {
                //changeContact(change.doc.id, change.doc.data());
                DotNet.invokeMethod("LandingPage", "firebaseEditContact", change.doc.id, JSON.stringify(change.doc.data()));
            }
        });
    });
    
    db.collection("projects").where("allow", "==", true).where("show", "==", true).orderBy("name").onSnapshot(snapshot => {
        let ch = snapshot.docChanges();
        ch.forEach(change => {
            if (change.type === "added") {
                DotNet.invokeMethod("LandingPage", "firebaseAddProj", change.doc.id, JSON.stringify(change.doc.data()));
            } else if (change.type === "removed") {
                //removeContactFromList(change.doc.id);
                DotNet.invokeMethod("LandingPage", "firebaseRemoveProj", change.doc.id);
            } else if (change.type === "modified") {
                //changeContact(change.doc.id, change.doc.data());
                DotNet.invokeMethod("LandingPage", "firebaseEditProj", change.doc.id, JSON.stringify(change.doc.data()));
            }
        });
    });

    db.collection('wpisy').where("allow", "==", true).where("show", "==", true).orderBy("time", "desc").onSnapshot(snapshot => {
        let ch = snapshot.docChanges();
        ch.forEach(change => {
            if (change.type === "added") {
                let data = change.doc.data();
                data.time = new Date(data.time.seconds * 1000);
                DotNet.invokeMethod("LandingPage", "firebaseAddPost", change.doc.id, JSON.stringify(data));
            } else if (change.type === "removed") {
                //removeContactFromList(change.doc.id);
                DotNet.invokeMethod("LandingPage", "firebaseRemovePost", change.doc.id);
            } else if (change.type === "modified") {
                //changeContact(change.doc.id, change.doc.data());
                let data = change.doc.data();
                data.time = new Date(data.time.seconds * 1000);
                DotNet.invokeMethod("LandingPage", "firebaseEditPost", change.doc.id, JSON.stringify(data));
            }
        });
    });

    db.collection("project_pages").where("allow", "==", true).where("show", "==", true).orderBy("name").onSnapshot(snapshot => {
        let ch = snapshot.docChanges();
        ch.forEach(change => {
            if (change.type === "added") {
               //DotNet.invokeMethod("LandingPage", "firebaseAddProj", change.doc.id, JSON.stringify(change.doc.data()));
            } else if (change.type === "removed") {
                //removeContactFromList(change.doc.id);
               // DotNet.invokeMethod("LandingPage", "firebaseRemoveProj", change.doc.id);
            } else if (change.type === "modified") {
                //changeContact(change.doc.id, change.doc.data());
                //DotNet.invokeMethod("LandingPage", "firebaseEditProj", change.doc.id, JSON.stringify(change.doc.data()));
            }
        });
    });
}

window.loadBlogPost = (id) => {
    db.collection("wpisy").doc(id).get().then(doc => {
        if (doc._document == null) {
            DotNet.invokeMethod("LandingPage", "firebaseLoadBlogPostError");
        }
        else {
            let data = doc.data();
            data.time = new Date(data.time.seconds * 1000);
            DotNet.invokeMethod("LandingPage", "firebaseLoadBlogPost", JSON.stringify(data));
        }
    })
}

window.loadProjectPage = (id) => {
    db.collection("project_pages").doc(id).get().then(doc => {
        if (doc._document == null) {
            DotNet.invokeMethod("LandingPage", "firebaseLoadProjectError");
        }
        else {
            let data = doc.data();
            DotNet.invokeMethod("LandingPage", "firebaseLoadProject", JSON.stringify(data));
        }
    })
}


