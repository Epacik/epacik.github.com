let elements = {};
let inst = {};
let win = {
  w: window.innerWidth,
  h: window.innerHeight,
};

let resize = function () {
  win.w = window.innerWidth;
  win.h = window.innerHeight;
  scrollCards();
};

let scrollCards = function (e) {

  // console.log(e);

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
      if (window.scrollY < win.h && i == 0) {
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

//elements of DOM
elements.mbtn = document.getElementById('mbtn');
elements.bbtn = document.getElementById('bbtn');
elements.navBtn = document.querySelector('.mfb');
elements.sideNav = document.querySelector('.sideNav');

inst.opMenu = function () {
  elements.sideNav.style.bottom = '0';
  elements.navBtn.classList.add('flip');
  document.body.style.overflow = 'hidden';
};

inst.clMenu = function () {
  elements.sideNav.style.bottom = '';
  elements.navBtn.classList.remove('flip');
  document.body.style.overflow = 'auto';
};

elements.mbtn.addEventListener('click', inst.opMenu);
elements.bbtn.addEventListener('click', inst.clMenu);

window.addEventListener('resize', resize);
document.addEventListener('scroll', scrollCards);

scrollCards();

document.getElementById('scrUp').addEventListener('click', function () {
  document.querySelector('body').scrollIntoView({ behavior: 'smooth',
    inline: 'start', block: 'start', });
});

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

          cnt.appendChild(el);
          console.log(cnt);
        }
      }

      cnt.classList.add('content');
      card.appendChild(cnt);
      pg.appendChild(card);
    }
  }

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

    btn.innerHTML = pages[i].id;
    nav.appendChild(btn);
  };

  goto('home');
  scrollCards();
}

buildPage();
