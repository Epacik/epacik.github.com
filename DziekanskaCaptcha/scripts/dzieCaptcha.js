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
    loadCss: ()=>{
        const cssId = 'dzie-captcha-css';
        if (!document.getElementById(cssId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://epacik.github.io/DziekanskaCaptcha/styles/dzieCaptchaQuestionForm.css';
            link.media = 'all';
            head.appendChild(link);
        }
    },
    receiveMessage: (event) => {
        var origin = event.origin || event.originalEvent.origin; 
        // For Chrome, the origin property is in the event.originalEvent object.
        if(!dzieCaptcha.iframeMouseOver || event.data != "dzieCaptchaRequested"){
            return;
        }

        console.log(`Clicked in dzieCAPTCHA with ID: ${dzieCaptcha.activeIframe.id}`);

        
        dzieCaptcha.loadCss();

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
        modal.style.top = `${coords.top}px`;
        modal.style.left =`${coords.left}px`;

        document.body.insertAdjacentElement("beforeend", modal);

        const submit = document.querySelector(".dzie-captcha-question-submit");

        dzieCaptcha.activaModalOptions = document.querySelectorAll("button[data-dzie-captcha-question-selection]");

        dzieCaptcha.activaModalOptions.forEach(el => {
            el.addEventListener("click", ev => {
                dzieCaptcha.activaModalOptions.forEach(el1 => {
                    el1.classList.remove("active");
                });
                el.classList.add("active");
                submit.innerHTML = "Zatwierdź";
                submit.style.width = "80px";
            });
        });

        submit.addEventListener("click", ()=>{
            const ac = document.querySelector("button.active[data-dzie-captcha-question-selection]");

            document.body.removeChild(modal);
            
            if(ac != null && ac.innerText == "Użyję włącznika"){
                ifr.children[0].contentWindow.postMessage(
                    "accepted", 
                    ifr.children[0].src
                );
            }
            else{
                ifr.children[0].contentWindow.postMessage(
                    "denied", 
                    ifr.children[0].src
                );
            }

            dzieCaptcha.activeModal = null;

        });
    },
    activaModalOptions: null,


}

window.addEventListener("message", e => { dzieCaptcha.receiveMessage(e); }, false);






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

dzieCaptcha.loadCss();

