let elements = {};
let inst = {};

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
