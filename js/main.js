/*jshint esversion:6*/
// jscs:disable maximumLineLength

console.log('loaded');

/**
 * @function toggleLoading
 * @desc Toggles loading screen
 */
function toggleLoading() {
  loading = document.getElementById('loading');
  if (loading.style.opacity == '0') {
    loading.style.opacity = '';
    loading.style.pointerEvents = '';
    document.body.style.overflow = '';
    document.querySelector('#loading #spinner div').style.animationName = 'spin';
  } else {
    loading.style.opacity = '0';
    loading.style.pointerEvents = 'none';
    document.body.style.overflow = 'auto';
    document.querySelector('#loading #spinner div').style.animationName = '';
  }

}

let underConstruction = true;
let debug = false;

/**
 * @function getURLParam
 * @desc Get value of URL Parameter
 * @param  {String} key Name of parameter
 * @return {String}     Value of checked parameter
 */
function getURLParam(key) {
  let params = new URLSearchParams(location.search);
  return params.get(key);
}


/**
 * @function setURLParam
 * @desc Set an URL Parameter
 * @param  {String} key   Name of parameter
 * @param  {String} value Value of parameter
 */
function setURLParam(key, value) {
  let params = new URLSearchParams(location.search);
  params.set(key, value);
  location.search = params.toString();
}

if (typeof URLSearchParams != 'undefined') {
  console.log(URLSearchParams);
}

/**
 * @function navigate
 * @desc change subpage
 *
 */
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

/**
 * @event window-hash-change
 * @desc Calls {@link navigate} when hash changes
 */
window.addEventListener('hashchange', navigate);

/**
 * @function goto
 * @desc Changes `location.hash` in order to change displayed su
 * bpage
 * @param  {String} pl New hash
 */
function goto(pl) {
  inst.clMenu();
  if (String(location.hash) == '#' + String(pl)) {
    return;
  }

  location.hash = '';
  location.hash = pl;
}

navigate();
