var dzieCaptcha = {
    iframeMouseOver : false,
    activeIframe: null,
    getCoords: (elem) => {
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top  = box.top +  scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left) };
    },
    activeModal: null,
}

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
  var origin = event.origin || event.originalEvent.origin; 
  // For Chrome, the origin property is in the event.originalEvent object.
  if(!dzieCaptcha.iframeMouseOver){
    
  }

  console.log(`Clicked in dzieCAPTCHA with ID: ${dzieCaptcha.activeIframe.id}`);

  const ifr = dzieCaptcha.activeIframe;

  const coords = dzieCaptcha.getCoords(ifr);

  const modalContent = `
  <section class="dzie-captcha-question-container" >
        <section class="dzie-captcha-question-header">
            <section>
                Jak włączyłbyś rzutnik?
            </section>
        </section>
        <section class="dzie-captcha-question-list" >
            <button data-dzie-captcha-question-selection="1">Użyję włącznika</button>
            <button data-dzie-captcha-question-selection="2">Zapytam kolegę o pomoc</button>
            <button data-dzie-captcha-question-selection="3">Poszukam w instrukcji</button>
            <button data-dzie-captcha-question-selection="4">Poszukam w Google</button>
        </section>
        <section class="dzie-captcha-question-button-container">
            <button class="dzie-captcha-question-submit">Pomiń</button>
        </section>
    </section>
  `;

  const modal = document.createElement("div");
  modal.innerHTML = modalContent;
  modal.style.position = "absolute";
  modal.style.top = coords.top;
  modal.style.left = coords.left;

  document.body.insertAdjacentElement("beforeend", modal);

}



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
    });
    element.addEventListener('mouseout', ()=>{
        dzieCaptcha.iframeMouseOver = false;
        dzieCaptcha.activeIframe = null;
    });

});

