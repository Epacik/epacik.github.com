/* jscs:disable maximumLineLength */
/**
 * @type {Object}
 * @namespace
 * @desc object of all elements needed in interface
 */
let elements = {};

/**
 * @type {Object}
 * @namespace
 * @desc instances of all elements (methods, objects etc. )
 */
let inst = {};

/**
 * @type {Object}
 * @name win
 * @desc Contains quick info about vrowser window
 */
let win = {
  w: window.innerWidth,
  h: window.innerHeight,
};

/**
 * @function resize
 * @desc Update {@link win} object and positions of sections of subpage
 */
let resize = function () {
  win.w = window.innerWidth;
  win.h = window.innerHeight;
  scrollCards();
};

/**
 * @function scrollUpButton
 * @desc Shor or hide "Scroll up button"
 */
function scrollUpButton() {
  let scrUp = document.getElementById('scrUp');
  if (window.scrollY * 2.5 > win.h) {
    scrUp.style.opacity = '1';
    scrUp.style.pointerEvents = 'all';
  } else {
    scrUp.style.opacity = '';
    scrUp.style.pointerEvents = '';
  }
}

/**
 * @function mdParse
 * @desc Replace content of all elements with parsed markdown from data-md tag if element have CSS class "markdown"
 */
function mdParse() {
  let md = document.querySelectorAll('.markdown');

  for (var i = 0; i < md.length; i++) {
    if (md[i].dataset != undefined && md[i].dataset.md != undefined) {
      md[i].innerHTML = marked(md[i].dataset.md);
    }
  }
}

/**
 * @function scroll
 * @desc call functions while scrolling
 */
function scroll(e) {
  scrollCards();
  scrollUpButton();
}

/**
 * @function scrollCards
 * @desc scroll sections of subpage with "fading behind"
 */
let scrollCards = function () {

  let cards = document.querySelectorAll('.card');
  if (cards == null) {
    return;
  }

  for (var i = 0; i < cards.length - 1; i++) {
    let el = cards[i].children[0];
    let elP = cards[i];

    let b = elP.getBoundingClientRect().bottom;
    let o = win.h;

    if (b <= o) {
      let p = o - b;
      if (window.scrollY > win.h && i == 0) {
        // console.log(window.scrollY);
        // console.log(win.h);
        el.style.transform = `scale(0.9)`;
        el.style.bottom = `0`;
        el.style.position = 'fixed';
        el.style.height = elP.offsetHeight + 'px';
        el.style.zIndex = `0.0000${i}`;
        el.style.boxShadow = '0 0 5px 0 black';
      } else if (p <= elP.offsetHeight) {
        let sc = 1 - (p / elP.offsetHeight);
        if (sc <= 0.9) {
          sc = 0.9;
        }

        el.style.transform = `scale(${sc})`;
        el.style.bottom = `0`;
        el.style.position = 'fixed';
        el.style.height = elP.offsetHeight + 'px';
        el.style.zIndex = `0.0000${i}`;
        el.style.boxShadow = '0 0 5px 0 black';
      }
    } else {
      el.style.transform = `scale(1)`;
      el.style.bottom = '';
      el.style.height = '';
      el.style.position = '';
      el.style.zIndex = ``;
      el.style.boxShadow = '';
    }

  }

};

/**
 * @name mbtn
 * @type {Object}
 * @memberof elements
 * @desc Contains menu button
 */
elements.mbtn = document.getElementById('mbtn');

/**
 * @name bbtn
 * @type {Object}
 * @memberof elements
 * @desc Contains close menu button
 */
elements.bbtn = document.getElementById('bbtn');

/**
 * @name navBtn
 * @type {Object}
 * @memberof elements
 * @desc Container for {@link mbtn} and {@link bbtn}
 */
elements.navBtn = document.querySelector('.mfb');

/**
 * @name sideNav
 * @type {Object}
 * @memberof  elements
 * @desc Side navigation menu
 */
elements.sideNav = document.querySelector('.sideNav');

/**
 * @name scrUp
 * @memberof elements
 * @desc Contains scroll up button
 */
elements.scrUp = document.getElementById('scrUp');

/**
 * @method opMenu
 * @memberof inst
 * @function
 * @desc Opens {@link elements.sideNav}
 */
inst.opMenu = function () {
  elements.sideNav.style.bottom = '0';
  elements.navBtn.classList.add('flip');
  document.body.style.overflow = 'hidden';
};

/**
 * @method clMenu
 * @memberof inst
 * @function
 * @desc Closes {@link elements.sideNav}
 */
inst.clMenu = function () {
  elements.sideNav.style.bottom = '';
  elements.navBtn.classList.remove('flip');
  document.body.style.overflow = 'auto';
};

/**
 * @event mbtn-click
 * @memberof elements
 * @desc Click on {@link elements.mbtn} calls {@link inst.opMenu}
 */
elements.mbtn.addEventListener('click', inst.opMenu);

/**
 * @event bbtn-click
 * @memberof elements
 * @desc Click on {@link elements.bbtn} calls {@link inst.clMenu}
 */
elements.bbtn.addEventListener('click', inst.clMenu);

/**
 * @event window-resize
 * @desc Calls {@link resize} function on resize of browser window
 */
window.addEventListener('resize', resize);

/**
 * @event document-scroll
 * @desc Calls {@link scroll} function on scroll
 */
document.addEventListener('scroll', scroll);

scrollCards();

/**
 * @function scrollToTop
 * @desc Scrolls website to top
 */
function scrollToTop() {
  document.body.scrollIntoView({ behavior: 'smooth',
    inline: 'start', block: 'start', });
}

/**
 * @event Click-scrUp
 * @desc Calls {@link scrollToTop} on click
 */
elements.scrUp.addEventListener('click', scrollToTop);

/**
 * @function buildPage
 * @desc builds webpage using structure stored in {@link pages}
 */
function buildPage() {
  let pgDOM = document.getElementById('pages');
  pgDOM.innerHTML = '';
  for (i = 0; i < pages.length; i++) {
    let main = document.createElement('main');
    main.id = pages[i].id.toUpperCase();
    main.classList.add('wrapper');
    pgDOM.appendChild(main);
    let pg = document.getElementById(pages[i].id.toUpperCase());
    let content = pages[i].content;

    for (j = 0; j < content.length; j++) {
      let card = document.createElement(content[j].type);
      let cnt = document.createElement('section');
      console.log(content[j].type);
      console.log(card);
      card.classList.add('card');

      if (content[j].dataset != undefined && typeof content[j].dataset == 'object') {
        for (var k = 0; k < content[j].dataset.length; k++) {
          let d = content[j].dataset[k];
          card.setAttribute(`data-${d.name}`, d.data);
        }
      }

      if (content[j].contentDataset != undefined && typeof content[j].contentDataset == 'object') {
        for (var k = 0; k < content[j].contentDataset.length; k++) {
          let d = content[j].contentDataset[k];
          cnt.setAttribute(`data-${d.name}`, d.data);
        }
      }

      if (content[j].id) {
        card.id = content[j].id;
      }

      if (content[j].class) {
        for (c = 0; c < content[j].class.length; c++) {
          card.classList.add(content[j].class[c]);
        }
      }

      if (typeof content[j].content == 'string') {
        cnt.innerHTML = content[j].content;
      } else if (typeof content[j].content == 'object') {
        let c = content[j].content;
        for (k = 0; k < c.length; k++) {
          let cn = c[k];
          let el = document.createElement(cn.type);
          el.innerHTML = cn.content;
          if (cn.id) {
            el.id = cn.id;
          }

          if (cn.class) {
            for (c = 0; c < cn.class.length; c++) {
              el.classList.add(cn.class[c]);
            }
          }

          if (cn.dataset != undefined && typeof cn.dataset == 'object') {
            for (var k = 0; k < cn.dataset.length; k++) {
              let d = cn.dataset[k];
              el.setAttribute(`data-${d.name}`, d.data);
            }
          }

          cnt.appendChild(el);
          console.log(cnt);
        }
      }

      cnt.classList.add('content');
      card.appendChild(cnt);
      pg.appendChild(card);
    }
  }

  /**
   * @function nav
   * @desc Generates content of sidenav menu based on {@link pages}
   */
  let nav = elements.sideNav;
  nav.innerHTML = '';
  for (i = 0; i < pages.length; i++) {
    let btn = document.createElement('button');
    let id = pages[i].id;
    btn.onclick = `goto(${id})`;

    btn.addEventListener('click', function () {
      goto(id);
      console.log(id);
    });

    btn.innerHTML = pages[i].name;
    nav.appendChild(btn);
  };

  mdParse();
  goto('home');
  navigate();
  scrollCards();
}

buildPage();
toggleLoading();
