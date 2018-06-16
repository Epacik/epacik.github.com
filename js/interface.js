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
    let elP = cards[i];

    let b = elP.getBoundingClientRect().bottom;
    let o = win.h;

    if (elP.offsetHeight < o) {
      o = elP.offsetHeight;
    }

    if (b <= o) {
      let p = o - b;
      if (p <= elP.offsetHeight) {
        let sc = 1 - (p / elP.offsetHeight);
        if (sc <= 0.9) {
          sc = 0.9;
        }

        // if (sc < 1) {
        //   sc = String(sc) + i * 2;
        // }

        el.style.transform = `scale(${sc})`;
        console.log(el.style.transform);
        el.style.bottom = `${i * 2}vh`;
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
  document.body.style.overflow = '';
};

elements.mbtn.addEventListener('click', inst.opMenu);
elements.bbtn.addEventListener('click', inst.clMenu);

window.addEventListener('resize', resize);
document.addEventListener('scroll', scrollCards);

scrollCards();
