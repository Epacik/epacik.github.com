const checkbox = document.querySelector(".checkbox-container");


const checkboxClicked = e => {
    checkbox.classList.add("clicking");
    setTimeout(()=> {
        checkbox.classList.remove("clicking");
    }, 310);
    parent.postMessage(
        "dzieCaptchaRequested", 
        address
    );
}

checkbox.addEventListener("click", checkboxClicked);

window.addEventListener("message", e => { 

    const checkbox = document.querySelector(".checkbox");
    if(e.data == "accepted"){
        checkbox.classList.remove("denied");
        checkbox.classList.add("accepted");
        setTimeout(()=>{
            checkbox.classList.remove("accepted");
        }, 10000);
    }
    else{
        checkbox.classList.remove("accepted");
        checkbox.classList.add("denied");
        setTimeout(()=>{
            checkbox.classList.remove("denied");
        }, 5000);
    }
 }, false);

const address = location.search.replace("?", "").split("&").find(e => e.startsWith("href")).replace("href=", "");


///Just to know how many people use this shit XD

//There is ***Nothing*** that prevents anyone from changing the counter manually... but pls don't I just want to know how many times it was used
//Nie ma ***NICZEGO*** co by zabraniało manualnej zmiany stanu licznika, ale proszę nie rób tego, ja chcę tylko wiedzieć ile razy ktoś użył tej CAPTCHy

// Required for side-effects
//require("firebase/firestore");
// Initialize Cloud Firestore through Firebase
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

const data = db.collection('DzieCaptcha').doc("data");

data.get().then( doc =>{
    if (doc.exists) {
        let docData = doc.data();
        data.update({counter: docData.counter + 1});
    }
});


// .onSnapshot(snapshot => {
// let ch = snapshot.docChanges();
//     ch.forEach(change => {
//         if (change.type === "added") {
//             //addProjectToList(change.doc.id, change.doc.data());
//             //document.getElementById("amount").innerHTML = change.doc.data().Licznik;
//             ChNum(change.doc.data().Licznik);
//         } else if (change.type === "removed") {
//             //document.getElementById("amount").innerHTML = 0;
//             ChNum(0);
//         } else if (change.type === "modified") {
//             //document.getElementById("amount").innerHTML = change.doc.data().Licznik;
//             ChNum(change.doc.data().Licznik);
//         }
//     });
// });
