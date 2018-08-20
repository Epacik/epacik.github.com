// jscs:disable maximumLineLength
/**
 * @type {Object}
 * @namespace
 * @desc object of all elements needed in interface
 */
let elements = {};

/**
 * @type {Object}
 * @namespace
 * @desc instances of all elements (methods, objects etc.)
 */
let inst = {};

/**
 * @name eif
 * @type {Object}
 * @namespace
 * @desc "Epat Interface Framework" 😂 contains methods and properties for building interface
 */
let eif = {};

/**
 * @function scrollUpButton
 * @memberof eif
 * @desc Shor or hide "Scroll up button"
 */
eif.scrollUpButton = function () {
  let scrUp = document.getElementById('scrUp');
  if (window.scrollY * 2.5 > window.innerHeight) {
    scrUp.classList.add('show');
  } else {
    scrUp.classList.remove('show');
  }
};

/**
 * @function mdParse
 * @memberof eif
 * @desc Replace content of all elements with parsed markdown from data-md tag if element have CSS class "markdown"
 */
eif.mdParse = function () {
  let md = document.querySelectorAll('.markdown');

  for (var i = 0; i < md.length; i++) {
    if (md[i].dataset != undefined && md[i].dataset.md != undefined) {
      md[i].innerHTML = marked(md[i].dataset.md);
    }
  }
};

/**
 * @function scroll
 * @memberof eif
 * @desc call functions while scrolling
 */
eif.scroll = function (e) {
  eif.scrollUpButton();
  eif.resize();
};

eif.resize = function () {
  eif.scrollCards();
  eif.adjustHeightOfCards();
}

/**
 * @function scrollCards
 * @memberof eif
 * @desc scroll sections of subpage with "fading behind"
 */
eif.scrollCards = function () {

  let cards = document.querySelectorAll('.card');
  if (cards == null) {
    return;
  }

  if (window.scrollY < 10) {
    for (i = 0; i < cards.length; i++) {
      let el = cards[i].children[0];
      let elP = cards[i];
      el.classList.remove('bgCard');
      el.style.height = '';
      el.style.position = '';
      el.style.zIndex = '';
    }
    return;
  }

  for (var i = 0; i < cards.length - 1; i++) {
    let el = cards[i].children[0];
    let elP = cards[i];

    let b = elP.getBoundingClientRect().bottom;
    let o = window.innerHeight;

    if (b <= o) {
      let p = o - b;
      if (window.scrollY > window.innerHeight && i == 0) {
        el.classList.add('bgCard');
        el.style.height = elP.offsetHeight + 'px';
        el.style.zIndex = `0.0000${i}`;
      } else if (p <= elP.offsetHeight) {
        let sc = 1 - (p / elP.offsetHeight);
        if (sc <= 0.9) {
          sc = 0.9;
        }
        el.classList.add('bgCard');
        el.style.height = elP.offsetHeight + 'px';
        el.style.zIndex = `0.0000${i}`;
      }
    } else {
      el.classList.remove('bgCard');
      el.style.height = '';
      el.style.zIndex = '';
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
  elements.sideNav.classList.add('open');
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
  elements.sideNav.classList.remove('open');
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
 * @memberof eif
 * @desc Calls {@link eif.resize} function on resize of browser window
 */
window.addEventListener('resize', eif.resize);

/**
 * @event document-scroll
 * @memberof eif
 * @desc Calls {@link eif.scroll} function on scroll
 */
document.addEventListener('scroll', eif.scroll);

eif.scrollCards();

/**
 * @function scrollToTop
 * @memberof eif
 * @desc Scrolls website to top
 */
eif.scrollToTop = function () {
  document.body.scrollIntoView({ behavior: 'smooth',
    inline: 'start', block: 'start', });
};

/**
 * @event Click-scrUp
 * @memberof eif
 * @desc Calls {@link eif.scrollToTop} on click
 */
elements.scrUp.addEventListener('click', eif.scrollToTop);

/**
 * @function buildPage
 * @memberof eif
 * @desc builds webpage using structure stored in {@link pages}
 */
eif.buildPage = function () {
  let pgDOM = document.getElementById('pages');
  pgDOM.innerHTML = '';
  for (i = 0; i < pages.length; i++) {
    let main = document.createElement('main');
    main.id = pages[i].id;
    main.classList.add('wrapper');
    pgDOM.appendChild(main);
    let pg = document.getElementById(pages[i].id);
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
          console.log(c.length);
          console.log('c: ');
          console.log(c);

          let cn = c[k];
          console.log(cn.id);
          let el = document.createElement(cn.type);
          el.innerHTML = cn.content;
          console.log(el);
          console.log(cn.content);
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

  eif.mdParse();
  goto('home');
  navigate();
  eif.scrollCards();
};

eif.makeSlider = function () {

};

// eif.buildPage();
// toggleLoading();

eif.ex_BP = function (pages) {

  // make page
  let pgsEl = document.getElementById('pages');
  let snv = document.getElementById('sidenav');

  pgsEl.innerHTML = ''; //clear pages container

  for (i = 0; i < pages.length; i++) {
    let pc = pages[i];
    let page = document.createElement('main');
    if (pc.id != undefined) {
      page.id = pc.id;
    };

    page.classList.add('wrapper');
    eif.addClasses(page, pc.classlist);
    eif.addData(page, pc.dataset);

    //make cards
    for (j = 0; j < pc.content.length; j++) {
      let cont = pc.content[j];
      let card = document.createElement(cont.type);
      let cCont = document.createElement('section');

      if (cont.id != undefined) {
        card.id = cont.id;
      }

      eif.addClasses(card, cont.classlist);
      card.classList.add('card');
      eif.addData(card, cont.dataset);

      if (typeof cont.content === 'string') {
        cCont.innerHTML = cont.content;
      } else {
        eif.addData(cCont, [{ name: 'content', data: JSON.stringify(cont.content) }]);
        cCont.classList.add('eif-ToBuild');
      }

      cCont.classList.add('content');
      card.appendChild(cCont);
      page.appendChild(card);
    }

    pgsEl.appendChild(page);
    eif.scrollCards();
  }

  // generate menu
  eif.pagesToNav

};

eif.pagesToNav = function () {
  let pgsEl = document.getElementById('pages');
  let snv = document.getElementById('sidenav');

  snv.innerHTML = '';
  for (i = 0; i < pages.length; i++) {
    let btn = document.createElement('button');
    let id = pages[i].id;
    btn.onclick = `goto(${id})`;

    btn.addEventListener('click', function () {
      goto(id);
      console.log(id);
    });

    btn.innerHTML = pages[i].name;
    snv.appendChild(btn);
  };
}

/**
 *
 *
 * @param  {Object} element HTML Object
 * @param  {Array.<Object>} dataset Array of Objest containing data for dataset API ({name: String, data: Any})
 */
eif.addData = function (element, dataset) {
  if (Object.prototype.toString.call(element) === '[object Object]') {
    console.warn('Element must be an HTML DOM Object');
    return;
  }

  if (dataset != undefined && Object.prototype.toString.call(dataset) === '[object Array]') {
    for (var k = 0; k < dataset.length; k++) {
      let d = dataset[k];
      element.setAttribute(`data-${d.name}`, d.data);
    }
  }
};

eif.addClasses = function (element, classlist) {
  if (classlist != undefined) {
    for (c = 0; c < classlist.length; c++) {
      element.classList.add(classlist[c]);
    }
  }
};

eif.buildInterface = function () {
  while (document.querySelector('.eif-ToBuild') !== null) {
    let elements = document.querySelectorAll('.eif-ToBuild');
    console.log(elements);
    for (let i = 0; i < elements.length; i++) {
      let el = elements[i];
      let cont = JSON.parse(el.dataset.content);
      for (j = 0; j < cont.length; j++) {
        let cEl = document.createElement(cont[j].type);

        eif.addClasses(cEl, cont[j].classlist);
        eif.addData(cEl, cont[j].dataset);
        console.log(cont[j]);
        if (cont[j].id != undefined) {
          cEl.id = cont[j].id;
        }

        if (typeof cont[j].content === 'string') {
          cEl.innerHTML = cont[j].content;
        } else {
          eif.addData(cEl, [{ name: 'content', data: JSON.stringify(cont[j].content) }]);
          cEl.classList.add('eif-ToBuild');
        }

        console.log(cEl);
        el.appendChild(cEl);
      }

      el.dataset.content = '';
      el.classList.remove('eif-ToBuild');

    }
  }
};

eif.slider = {};

eif.slider.imgLoaded = function (e) {
  let img = e;
  console.log(e);
  let slider = img.parentNode.parentNode;
  if (img.offsetHeight > slider.offsetHeight) {
    slider.style.height = img.offsetHeight + 'px';
  }
}

eif.slider.resize = function () {
  let sliders = document.querySelectorAll('.eif-slider');
  for (i = 0; i < sliders.length; i++) {
    let height = 0;
    let j;
    let ch = sliders[i].children;
    for (j = 0; j < ch.length - 1; j++) {
      if (ch[j].children[0].offsetHeight > height) {
        height = ch[j].children[0].offsetHeight;
      }
    }

    sliders[i].style.height = height + 'px';
  }
}

eif.initSlider = function () {
  let sliders = document.querySelectorAll('.rslides');

  for (i = 0; i < sliders.length; i++) {
    let slider = sliders[i];
    let sliderHeight = 0;
    slider.innerHTML = '';
    let slides = JSON.parse(slider.dataset.slides);
    let folder = slider.dataset.sliderfolder;
    for (j = 0; j < slides.length; j++) {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = folder + slides[j].name;
      img.alt = slides[j].desc;
      img.setAttribute('onload', 'eif.slider.imgLoaded(this)');
      li.appendChild(img);
      slider.appendChild(li);
    }
    $(".rslides").responsiveSlides({
      auto: true,
      nav: true,

    });
  }

};

eif.slider.chSl = function (e) {
  let sl = e.target.parentNode.parentNode;
  let ind = e.target.parentNode.children[2];
  let bt = e.target;
  let active = sl.dataset.active_slide;

  sl.children[active].classList.remove('active');
  ind.children[active].classList.remove('active');
  if (bt.classList.contains('eif-slider-right')) {
    if (Number(active) == sl.children.length - 2) {
      active = 0;
    } else {
      active++;
    }
  } else if (bt.classList.contains('eif-slider-left')) {
    if (Number(active) == 0) {
      active = sl.children.length - 2;
    } else {
      active--;
    }
  }
  sl.dataset.active_slide = active;
  for (i = active; i < sl.children.length - 2; i++) {
    sl.children[i].classList.remove('onleft')
  }
  for (i = 0; i < active; i++) {
    sl.children[i].classList.add('onleft')
  }
  sl.children[active].classList.add('active');
  ind.children[active].classList.add('active');
}

eif.adjustHeightOfCards = function () {
  return;
  let cards = document.querySelectorAll('.card');
  for (i = 0; i < cards.length; i++) {
    cards[i].style.height = '';
    cards[i].children[0].style.height = '';
    if (cards[i].tagName == 'FOOTER') {
      continue;
    }

    if (cards[i].offsetHeight < window.innerHeight) {
      cards[i].style.height = window.innerHeight + 'px';
      cards[i].children[0].style.height = window.innerHeight + 'px';
    } else {
      cards[i].style.height = cards[i].offsetHeight + 'px';
      cards[i].children[0].style.height = cards[i].offsetHeight + 'px';
    }
  }
};

eif.autoFill = function () {
  let af = document.querySelectorAll('.eif-autoFill');
  for (i = 0; i < af.length; i++) {
    af[i].innerHTML = ct[af[i].dataset.ct];
  }
}

eif.scrToCard = function (i) {
  if (i > 0) {
    i--;
  } else {
   i = 0;
  }
  document.querySelector(location.hash).children[i].scrollIntoView({behavior: 'smooth'});
}

eif.initAll = function (pages) {
  if (pages == undefined || Object.prototype.toString.call(pages) !== '[object Array]') { //Object.prototype.toString.call(pages) check type of "pages"
    if (content == undefined) {
      return 'invalid argument';
    }

    pages = content;
  }

  // eif.ex_BP(pages);
  eif.pagesToNav();
  goto(pages[0].id);
  navigate();
  eif.autoFill();
  // eif.buildInterface();
  eif.initSlider();
  eif.mdParse();
  eif.scrollCards();
  toggleLoading();
};

eif.initAll();
