/* jscs ignore:maximumLineLength */
let ct = {};
ct.footer = `<ul>
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

ct.strings = {
  welcomeTxt: "Hello!\nI'm Epat,\na student from Poland which want"
};

let footer = ct.footer;

let mainSlider =  {
    type: 'section',
    classlist: [
      'eif-slider'
    ],
    content: [
      {
        type: 'ul',
        classlist: [
          'rslides'
        ],
        dataset: [
          {
            name: 'slides',
            data: JSON.stringify(
              [
                {
                  name: 'sl(1).jpg',
                  desc: 'Rocket in VAB',
                },
                {
                  name: 'sl(2).jpg',
                  desc: 'Sun over the horizon',
                },
                {
                  name: 'sl(3).jpg',
                  desc: 'Planet with rings',
                },
                {
                  name: 'sl(4).jpg',
                  desc: 'Start over mountians',
                },
                {
                  name: 'sl(5).jpg',
                  desc: 'Gaia and Sun',
                },
                {
                  name: 'sl(6).jpg',
                  desc: 'High above ground',
                },
                {
                  name: 'sl(7).jpg',
                  desc: 'Almost in space',
                },
                {
                  name: 'sl(8).jpg',
                  desc: 'Boosters separation and gravity turn',
                },
                {
                  name: 'sl(9).jpg',
                  desc: 'To other worlds',
                },
              ]
            ),
          },
          {
            name: 'sliderfolder',
            data: './img/mainSlider/',
          },
          {
            name: 'active_slide',
            data: '0',
          }
        ],
        content: '',
      }
    ],
  };


let content = [{
  id: 'home',
  name: 'Home',
  classlist: [
    'c1',
    'c2',
  ],
  dataset: [
    {
      name: 'n',
      data: 'D',
    },
  ],
  content: [
  {
      type: 'header',
      id: 'mainHeader',
      class: [
         'some',
         'classes',
      ],
      dataset: [
      {
          name: 'string',
          data: 'some data',
        },
      ],
      content: [
        {
          type: 'header',
          content: 'Epat',
        },
        mainSlider,
        {
          type: 'div',
          content: [
            {
              type: 'p',
              classlist: [
                'markdown',
              ],
              dataset: [
                {
                  name: 'md',
                  data: '## Some text made from parsing Markdown',
                },
              ],
              content: '',
            },
            {
              type: 'span',
              content: [
                {
                  type: 'audio',
                  id: 'player',
                  content: 'loool',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'footer',
      content: footer, //standard footer layout
    },
  ],
},
{
  id: 'home2',
  name: 'Home2',
  classlist: [
    'c1',
    'c2',
  ],
  dataset: [
    {
      name: 'n',
      data: 'D',
    },
  ],
  content: [
  {
      type: 'header',
      id: 'mainHeader',
      class: [
         'some',
         'classes',
      ],
      dataset: [
      {
          name: 'string',
          data: 'some data',
        },
      ],
      content: [
        {
          type: 'header',
          content: 'Epat',
        },
        {
          type: 'div',
          id: 'test',
          classlist: [
            'test',
          ],
          content: [
            {
              type: 'p',
              content: 'Description',
            },
            {
              type: 'span',
              content: [
                mainSlider,
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'footer',
      content: footer, //standard footer layout
    },
  ],
},
];
