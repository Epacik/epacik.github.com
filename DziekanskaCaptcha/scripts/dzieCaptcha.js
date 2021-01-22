document.querySelectorAll("div[data-dziecaptcha='loadHere']").forEach(element => {
    const captcha = document.createElement("iframe");
    captcha.src = "https://epacik.github.io/DziekanskaCaptcha/checkbox.html";
    captcha.scrolling = "no";
    captcha.sandbox = "allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation";
    captcha.width = "304";
    captcha.height = "78";
    captcha.frameBorder = "0";

    element.insertAdjacentElement("afterbegin",captcha);

    element.style.height = "78px";
});