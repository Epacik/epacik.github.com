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
}

window.loadBlogPost = (id) => {
    db.collection("wpisy").doc(id).get().then(doc => {
        if (doc._document == null) {

            //postModal.children[0].children[0].innerHTML = `<div class="modal-header">
            //      <h5 class="modal-title" id="postModalScrollableTitle"></h5>
            //      <button type="button" class="close" data-dismiss="modal" onclick="window.stop()" aria-label="Close">
            //          <span aria-hidden="true">&times;</span>
            //      </button>
            //  </div>
            //  <div class="modal-body">
            //      ${i18n.gettext("missing post")}
            //  </div>
            //  <div class="modal-footer">
            //      <b>Epat</b> 
            //  </div>`;
        }
        else {
            let data = doc.data();


            data.time = new Date(data.time.seconds * 1000);
            DotNet.invokeMethod("LandingPage", "firebaseLoadBlogPost", JSON.stringify(data));
            
        }
    })
}



