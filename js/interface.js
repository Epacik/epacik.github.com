let elements = {};
let inst = {};
let win = {
  w: window.innerWidth,
  h: window.innerHeight,
};

let resize = function () {
  win.w = window.innerWidth;
  win.h = window.innerHeight;
  console.log(win);
};

let scrollCards = function (e) {
  // console.log(e);
  let h = document.querySelector('header');
  let hc = document.querySelector('header').children[0];
  let cards = document.querySelectorAll('.card');

  for (var i = 0; i < cards.length - 1; i++) {
    let el = cards[i].children[0];

    let b = cards[i].getBoundingClientRect().bottom;
    if (b <= win.h) {
      let p = win.h - b;
      if (p <= win.h) {
        let sc = 1 - (p / win.h);
        if (sc <= 0.8) {
          sc = 0.8;
        }

        el.style.transform = `scale(${sc})`;
        el.style.top = `0.${i}vh`;
        el.style.position = 'fixed';
        el.style.zIndex = `0.0000${i}`;
        el.style.boxShadow = '0 0 5px 0 black';
      }
    } else {
      el.style.transform = `scale(1)`;
      el.style.top = '';
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
  document.body.style.overflow = '';
};

elements.mbtn.addEventListener('click', inst.opMenu);
elements.bbtn.addEventListener('click', inst.clMenu);

window.addEventListener('resize', resize);
document.addEventListener('scroll', scrollCards);

scrollCards();
