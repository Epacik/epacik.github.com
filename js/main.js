/*jshint esversion:6*/

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

function showConstr() {
  let constr = document.querySelector('.WUP');
  if (!debug && underConstruction) {
    constr.style.opacity = '1';
    constr.style.pointerEvents = 'all';
  } else {
    constr.style.opacity = '';
    constr.style.pointerEvents = '';
  }
}

if (getURLParam('deb')) {
  debug = true;
}

showConstr();
