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
                //DotNet.invokeMethod("LandingPage", "firebaseAddContact", change.doc.id, JSON.stringify(change.doc.data()));
            } else if (change.type === "removed") {
                //removeContactFromList(change.doc.id);
                //DotNet.invokeMethod("LandingPage", "firebaseRemoveContact", change.doc.id);
            } else if (change.type === "modified") {
                //changeContact(change.doc.id, change.doc.data());
                //DotNet.invokeMethod("LandingPage", "firebaseEditContact", change.doc.id, JSON.stringify(change.doc.data()));
            }
        });
    });
}



