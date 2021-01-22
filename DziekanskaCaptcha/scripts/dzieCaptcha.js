var dzieCaptcha = {
    iframeMouseOver : false,
    activeIframe: undefined
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  var origin = event.origin || event.originalEvent.origin; 
  // For Chrome, the origin property is in the event.originalEvent object.
  console.log(origin);

  // ...
}

window.addEventListener('blur',function(){
    if(dzieCaptcha.iframeMouseOver){
        console.log('Wow! Iframe Click!');
        document.body.click();
        document.body.focus();
        window.focus();
        dzieCaptcha.activeIframe.blur();
    }
});


document.querySelectorAll("div[data-dziecaptcha='loadHere']").forEach(element => {
    const captcha = document.createElement("iframe");
    captcha.src = `https://epacik.github.io/DziekanskaCaptcha/checkbox.html?href=${location.href}`;
    captcha.scrolling = "no";
    captcha.sandbox = "allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation";
    captcha.width = "304";
    captcha.height = "78";
    captcha.frameBorder = "0";

    element.insertAdjacentElement("afterbegin",captcha);

    element.style.height = "78px";

    element.addEventListener('mouseover', ()=>{
        dzieCaptcha.iframeMouseOver = true;
        dzieCaptcha.activeIframe = element;
        console.log(dzieCaptcha.activeIframe);
    });
    element.addEventListener('mouseout', ()=>{
        dzieCaptcha.iframeMouseOver = false;
        dzieCaptcha.activeIframe = undefined;
        console.log(dzieCaptcha.activeIframe);
    });

});

