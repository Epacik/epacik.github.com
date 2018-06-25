let footer = `<ul>
  <li>
    <div class="icon fab fa-discord"></div>
    <p>Discord: Epat#9309</p>
  </li>
  <li onclick="window.open('https://twitter.com/epaciatko', '_blank')">
    <div class="icon fab fa-twitter"></div>
    <p>Twitter</p>
  </li>
  <li onclick="window.open('https://github.com/Epat9', '_blank')">
    <div class="icon fab fa-github"></div>
    <p>Github</p>
  </li>
  <li onclick="window.location = 'mailto:epaciatko@gmail.com'">
    <div class="icon fas fa-envelope"></div>
    <p>epaciatko@gmail.com</p>
  </li>
  <li onclick="window.open('https://www.codewars.com/users/Epacik')">
    <div class="ico ico-codewars">
    </div>
    <p>Codewars</p>
  </li>
</ul>`;

let pages = [
  {
    id: 'home',
    name: 'Home',
    content: [
      {
        type: 'header',
        id: 'mainHeader',
        content: [
          {
            type: 'header',
            content: '<div></div><div>Epat</div>',
          },
          {
            type: 'section',
            class: [
              'slider',
            ],
            content: '',
          },
        ],
      },
      {
        type: 'section',
        content: '<p class="markdown" data-md="# lol \n## even more testing"></p>',
      },
      {
        type: 'section',
        content: '<p class="markdown" data-md="### looool"></p>',
      },
      {
        type: 'footer',
        content: footer,
      },
    ],
  },
  {
    id: 'testingPage',
    name: 'Testing Page',
    content: [
      {
        type: 'header',
        id: 'mainHeader',
        content: [
          {
            type: 'header',
            content: '{Epat}',
          },
          {
            type: 'p',
            content: 'Testing Page',
          },
        ],
      },
      {
        type: 'footer',
        content: footer,
      },
    ],
  },
];
