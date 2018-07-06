/* jscs ignore:maximumLineLength */
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

let mainSlider =  {
    type: 'section',
    classlist: [
      'eif-slider',
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
  };

// // * @property {Array.<{id: String}>} id id of a subpage
// // * @property {String} name is used in side menu
// // * @property {Array} dataset contains data for HTML5 dataset API
// // * @property {Array} content contains sections of a subpage
//
// /**
// * @type {Array.<Object>}
// * @namespace
// * @desc This array contains informations about layout of webpage. Each index contains a section or a "subpage".
// * @property {Array.<Object>} page contains a subpage
// * @example <JavaScript>
// * [{
// *  id: 'page',
// *  name: 'Page',
// *  dataset: [
// *    {
// *     name: 'some_name',
// *     data: 'some data'
// *    }
// *  ],
// *  content: [
// *    {
// *      type: 'header',
// *      id: 'mainHeader',
// *      class: [
// *         'some',
// *         'classes',
// *      ],
// *      dataset: [
// *        {
// *          name: 'string',
// *          data: 'some data',
// *        },
// *      ],
// *      contentDataset: [
// *        {
// *          name: 'string',
// *          data: 'some other data',
// *        },
// *      ],
// *      content: [
// *        {
// *          type: 'header',
// *          content: 'Epat',
// *        },
// *        {
// *          type: 'p',
// *          content: 'Description',
// *        },
// *      ],
// *    },
// *    {
// *      type: 'footer',
// *      content: footer, //standard footer layout
// *    },
// *  ],
// *}],
// */
//
// let pages = [
//
//   {
//     /**
//      * @memberof pages
//      * @type {String}
//      * @desc id of an subpage
//      */
//     id: 'home',
//
//     /**
//      * @memberof pages
//      * @type {String}
//      * @desc Name used in Side Nav Menu
//      */
//     name: lang.menu.home,
//
//     /**
//      * @memberof pages
//      * @type {Array.<String>}
//      * @desc List of CSS classes
//      */
//     class: [
//       'home-page',
//     ],
//
//     /**
//      * @type {array.<Object>}
//      * @desc contains sections of subpage
//      * @namespace
//      * @memberof pages
//      */
//     content: [
//       {
//
//         /**
//          * @type {string}
//          * @memberof pages.content
//          * @desc string used to create HTML element eg. 'header', 'p'
//          */
//         type: 'header',
//
//         /**
//          * @type {Array.<Object>}
//          * @memberof pages.content
//          * @namespace
//          * @desc Array of objects used for Dataset API in section of subpage
//          * @example
//          * <JavaScript>
//          * [
//          *  {name: 'theme', data 'light'},
//          * ]
//          */
//         dataset: [
//           {
//
//             /**
//              * @type {String}
//              * @memberof pages.content.dataset
//              * @desc name of data unit (data-{name})
//              */
//             name: 'lol',
//
//             /**
//              * @type {String}
//              * @memberof pages.content.dataset
//              * @desc data contained in unit
//              */
//             data: '4004',
//           },
//         ],
//
//         /**
//          * @type {Array.<Object>}
//          * @namespace
//          * @memberof pages.content
//          * @desc Array of objects used for Dataset API in card (content of a section)
//          * @example
//          * <JavaScript>
//          * [
//          *  {name: 'md', data '# Heading'},
//          * ]
//          */
//         contentDataset: [
//           {
//             /**
//              * @type {String}
//              * @memberof pages.content.contentDataset
//              * @desc name of data unit (data-{name})
//              */
//             name: 'test',
//
//             /**
//              * @type {String}
//              * @memberof pages.content.contentDataset
//              * @desc data contained in unit
//              */
//             data: ';)',
//           },
//         ],
//
//         /**
//          * @type {String}
//          * @memberof pages.content
//          * @desc An ID of sevtion of subpage
//          */
//         id: 'mainHeader',
//
//         /**
//          * @type {Array.<Object>}
//          * @memberof pages.content
//          * @namespace
//          * @desc Content of a section of subpage
//          * @example
//          * <JavaScript>
//          * [
//          *  {type: 'header' id}
//          * ]
//          */
//         content: [
//           {
//               type: 'section',
//               class: [
//                 'slider',
//               ],
//               dataset: [
//                 {
//                   name: 'slides',
//                   data: JSON.stringify(
//                     [
//                       {
//                         name: 'sl (1).jpg',
//                         desc: 'Rocket in VAB',
//                       },
//                       {
//                         name: 'sl (2).jpg',
//                         desc: 'Sun over the horizon',
//                       },
//                       {
//                         name: 'sl (3).jpg',
//                         desc: 'Planet with rings',
//                       },
//                       {
//                         name: 'sl (4).jpg',
//                         desc: 'Start over mountians',
//                       },
//                       {
//                         name: 'sl (5).jpg',
//                         desc: 'Gaia and Sun',
//                       },
//                       {
//                         name: 'sl (6).jpg',
//                         desc: 'High above ground',
//                       },
//                       {
//                         name: 'sl (7).jpg',
//                         desc: 'Almost in space',
//                       },
//                       {
//                         name: 'sl (8).jpg',
//                         desc: 'Boosters separation and gravity turn',
//                       },
//                       {
//                         name: 'sl (9).jpg',
//                         desc: 'To other worlds',
//                       },
//                     ]
//                   ),
//                 },
//                 {
//                   name: 'sliderFolder',
//                   data: './img/mainSlider/',
//                 },
//               ],
//               content: '',
//             },
//           mainSlider,
//           {
//
//             /**
//              * @memberof pages.content.content
//              * @type {String}
//              * @desc type of a HTML element eg. 'header'
//              */
//             type: 'header',
//
//             /**
//              * @memberof pages.content.content
//              * @type {String}
//              * @desc HTML id of element
//              */
//             id: 'top-bar',
//
//             /**
//              * @memberof pages.content.content
//              * @type {Array.<String>}
//              * @desc List of CSS classes
//              */
//
//             class: [
//               'markdown',
//             ],
//
//             /**
//              * @type {Array.<Object>}
//              * @memberof pages.content.content
//              * @namespace
//              * @desc Array of objects used for Dataset API in element
//              * @example
//              * <JavaScript>
//              * [
//              *  {name: 'theme', data 'light'},
//              * ]
//              * <HTML>
//              * <a data-theme="light"></a>
//              */
//             dataset: [
//               {
//                 /**
//                  * @type {String}
//                  * @memberof pages.content.content.dataset
//                  * @desc name of data unit (data-{name})
//                  */
//                 name: 'md',
//                 /**
//                  * @type {String}
//                  * @memberof pages.content.content.dataset
//                  * @desc data contained in unit
//                  */
//                 data: 'Epat',
//               },
//             ],
//
//             /**
//              * @type {String}
//              * @memberof pages.content.content
//              * @desc content of a HTML element (innerHTML)
//              */
//             content: '<div>Epat</div>',
//           },
//         ],
//       },
//       {
//         type: 'section',
//         content: [
//           mainSlider,
//           { type: 'div', content: 'lol' },
//           mainSlider,
//         ],
//       },
//       {
//         type: 'section',
//         content: '<p class="markdown" data-md="### Some more text in markdown"></p>',
//       },
//       {
//         type: 'footer',
//         content: footer,
//       },
//     ],
//   },
//   {
//     id: 'testingPage',
//     name: 'Testing Page',
//     content: [
//       {
//         type: 'header',
//         id: 'mainHeader',
//         content: [
//           {
//             type: 'header',
//             content: '{Epat}',
//           },
//           {
//             type: 'p',
//             content: 'Testing Page',
//           },
//           mainSlider,
//         ],
//       },
//       {
//         type: 'footer',
//         content: footer,
//       },
//     ],
//   },
// ];

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
