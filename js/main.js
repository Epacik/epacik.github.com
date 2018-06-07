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

if (typeof URLSearchParams != 'undefined') {

}
