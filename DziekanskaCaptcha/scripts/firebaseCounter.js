var config = {
    apiKey: "AIzaSyCo61ez5fN6_hmXsq-0yaSHKunjRnbtkvo",
    authDomain: "epacik-github-io-db.firebaseapp.com",
    databaseURL: "https://epacik-github-io-db.firebaseio.com",
    projectId: "epacik-github-io-db",
    storageBucket: "epacik-github-io-db.appspot.com",
    messagingSenderId: "11190278297"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({});

db.collection('DzieCaptcha').doc("data").onSnapshot(snapshot => {

    let counter = document.getElementById("counter");
    if(snapshot.exists){
        counter.innerHTML = snapshot.data().counter;
    }
});