/*jshint esversion:6*/

console.log('loaded');

function toggleLoading() {
  loading = document.getElementById('loading');
  if (loading.style.opacity == '') {
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('#loading #spinner div').style.animationName = 'none';
  } else {
    loading.style.opacity = '';
    loading.style.pointerEvents = '';
    document.body.style.overflow = '';
    document.querySelector('#loading #spinner div').style.animationName = '';
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

function navigate(e) {
  console.log(e);
}

window.addEventListener('hashchange', navigate);

toggleLoading();
