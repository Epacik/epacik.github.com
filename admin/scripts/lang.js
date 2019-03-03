/**
 * @name lang
 * @desc Contains language data
 */

var i18n = window.i18n();


i18n.setMessages("buttons", "pl", {
    "Check it out": "Sprawdź projekt",
});

i18n.setMessages("buttons", "en", {
    "Check it out": "Check it out",
});

i18n.setMessages("other", "pl", {
    "copy address": "Skopiuj adres",
});

i18n.setMessages("other", "en", {
    "copy address": "Copy address",
});

i18n.setMessages("errors", "pl", {
    "missing post": "Post którego szukasz nie istnieje.<br> Upewnij się, że wprowadziłeś poprawny adres URL",
});

i18n.setMessages("errors", "en", {
    "missing post": "Unfortunately, the post you are looking for does not exist.<br> Check if you entered the" +
        " correct URL address",
});

i18n.setMessages("nav", "pl", {
   "home": "Strona domowa",
    "blog": "Mój Blog",
    "contact": "Kontakt"
});

i18n.setMessages("nav", "en", {
    "home": "Home",
    "blog": "My Blog",
    "contact": "Contact"
});




i18n.setMessages("home", "pl", {
    "Hello": "Witaj",
    "I'm Epat": "Jestem Damian, albo Epat jeśli wolisz",
    "student": "Zwykły" +
        " uczeń, pasjonat informatyki, astronomii i czegokolwiek co mnie zainteresuje",
    "what I'm doing lately": "Jeśli chcesz" +
        " dowiedzieć się co ostatnio robiłem, przewiń w dół, może znajdziesz coś interesującego.",
    "My projects": "Moje projekty",
    "More coming": "I będzie ich więcej 😉",
    "renders": "Oto rendery scen zrobionych przeze mnie",

});

i18n.setMessages("home", "en", {
    "Hello": "Hello",
    "I'm Epat": "I'm Damian, or Epat if you want",
    "student": "A simple student with passion for computer science, astronomy and whatever else I find interesting.",
    "what I'm doing lately": "If you want to find out what I'm doing lately, scroll down, maybe something will interest you.",
    "My projects": "My projects",
    "More coming": "And more coming 😉",
    "renders": "Here you can find some renders of scenes that I made",

});


i18n.setMessages("contact", "pl", {
    "find me": "Znajdziesz mnie tutaj",
});

i18n.setMessages("contact", "en", {
    "find me": "You can find me here",
});

function applyLocaleToNav() {
    let navs = document.querySelectorAll(".navbar");
    i18n.textdomain("nav");

    for (i = 0; i < navs.length; i++){
        let nav = navs[i].querySelector(".navbar-collapse");
        nav.querySelector('[href="#home"]').innerHTML = i18n.gettext("home");
        nav.querySelector('[href="#blog"]').innerHTML = i18n.gettext("blog");
        nav.querySelector('[href="#contact"]').innerHTML = i18n.gettext("contact");
    }
}

function applyLocaleToHome() {
    let home = document.getElementById("home");
    let basicInfo = home.querySelector("#basicInfo");
    i18n.textdomain("home");

    basicInfo.querySelector("h1").innerHTML = i18n.gettext("Hello");
    basicInfo.querySelector("h3").innerHTML = i18n.gettext("I'm Epat");
    basicInfo.querySelector("h5").innerHTML = i18n.gettext("student");
    basicInfo.querySelector("h4").innerHTML = i18n.gettext("what I'm doing lately");


    let projects = document.querySelector("#projects");

    projects.querySelector("h3").innerHTML = i18n.gettext("My projects");

    let renders = document.querySelector("#renders");

    renders.querySelector("h3").innerHTML = i18n.gettext("renders");
}




function applyLocaleToContact() {
    let contact = document.getElementById("contact");
    i18n.textdomain("contact");

    let contactPane = contact.querySelector("#contactPane");

    contactPane.querySelector("h3").innerHTML = i18n.gettext("find me");

}

function applyLocaleToOthers() {
    i18n.textdomain("other");

    document.getElementById("copyModalTitle").innerHTML = i18n.gettext("copy address");
}



function applyLocalization() {
    if (localStorage.getItem("force-en") === "true"){
        i18n.setLocale("en");
    } else if (geoData.country.toLowerCase() === "pl"){
        i18n.setLocale(geoData.country.toLowerCase())
    } else {
        i18n.setLocale("en");
    }
    document.querySelector("html").lang = i18n.getLocale();
    applyLocaleToNav();
    applyLocaleToHome();
    applyLocaleToContact();
    applyLocaleToOthers();
    applyLayout();
}