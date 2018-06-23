/*jshint esversion:6*/

console.log('loaded');

function toggleLoading() {
  loading = document.getElementById('loading');
  if (loading.style.opacity == '0') {
    loading.style.opacity = '';
    loading.style.pointerEvents = '';
    document.body.style.overflow = '';
    document.querySelector('#loading #spinner div').style.animationName = '';
  } else {
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('#loading #spinner div').style.animationName = 'none';
  }

}

let underConstruction = true;
let debug = false;

function getURLParam(key) {
  let params = new URLSearchParams(location.search);
  return params.get(key);
}

function setURLParam(key, value) {
  let params = new URLSearchParams(location.search);
  params.set(key, value);
  location.search = params.toString();
}

if (typeof URLSearchParams != 'undefined') {
  console.log(URLSearchParams);
}

function navigate() {
  let pages = document.getElementById('pages').children;
  let id = '';
  let hash = location.hash;
  if (hash != '') {
    hash = hash.split('#')[1];
  }

  if (hash != 'home' && hash != '') {
    id = hash;
  } else {
    id = 'Home';
  }

  for (i = 0; i < pages.length; i++) {
    if (pages[i].id.toUpperCase() == id.toUpperCase()) {
      pages[i].style.left = '0';
      pages[i].style.opacity = '1';
      pages[i].style.position = 'static';
      pages[i].style.pointerEvents = 'all';
    } else {
      pages[i].style.left = '';
      pages[i].style.opacity = '';
      pages[i].style.position = '';
      pages[i].style.pointerEvents = '';
    }
  }
}

window.addEventListener('hashchange', navigate);

function goto(pl) {
  inst.clMenu();
  location.hash = '';
  location.hash = pl;
}

navigate();
toggleLoading();
