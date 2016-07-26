(function() {
  'use strict';

  angular
      .module('macroscopeKiosk')
      .service('macroscopes', macroscopes);

  /** @ngInject */
  function macroscopes() {
    var iteration = [
      {
        'id':'iter11',
        'logo':'test1.png',
        'title': "Interact with Science",
        'subtitle': 'Iteration 11',
        'data': [
          {
            'id': 'earth',
            'title': 'Earth',
            'subtitle': 'Weather on a worldwide scale',
            'url': 'http://earth.nullschool.net/?kiosk',
            'instructions-template': 'instructions-earth.tmpl.html',
            'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
            'makers-template': 'makers-earth.tmpl.html',
            'logo': 'earth.jpg',
            'type': 'iframe'
          },
          {
            'id': 'academy-scope',
            'title': 'AcademyScope',
            'subtitle': 'Exploring the scientific landscape',
            'url': 'http://www.nap.edu/academy-scope/?kiosk=true',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'academy-scope.png',
            'type': 'iframe'
          },
          {
            'id': 'mapping-global-news',
            'title': 'Mapping Global News',
            'subtitle': 'Local news from a global perspective',
            'url': 'http://data.gdeltproject.org/blog/news-cooccurrence-globe/globe_cooccur_kiosk.html',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'mapping-global-society.png',
            'type': 'iframe'
          },
          {
            'id': 'charting-culture',
            'title': 'Charting Culture',
            'subtitle': '2,600 years of human history in 5 minutes',
            'url': 'assets/videos/ChartingCulture.webm',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'charting-culture.jpg',
            'type': 'video'
          }
        ]
      },
            {
        'id':'iter12',
        'logo':'test2.png',
        'title': "Make Sense of Science",
        'subtitle': 'Iteration 12',
        'data': [
          {
            'id': 'earth',
            'title': 'Earth (12)',
            'subtitle': 'Weather on a worldwide scale',
            'url': 'http://earth.nullschool.net/?kiosk',
            'instructions-template': 'instructions-earth.tmpl.html',
            'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
            'makers-template': 'makers-earth.tmpl.html',
            'logo': 'earth.jpg',
            'type': 'iframe'
          },
          {
            'id': 'academy-scope',
            'title': 'AcademyScope (12)',
            'subtitle': 'Exploring the scientific landscape',
            'url': 'http://www.nap.edu/academy-scope/?kiosk=true',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'academy-scope.png',
            'type': 'iframe'
          },
          {
            'id': 'mapping-global-news',
            'title': 'Mapping Global News (12)',
            'subtitle': 'Local news from a global perspective',
            'url': 'http://data.gdeltproject.org/blog/news-cooccurrence-globe/globe_cooccur_kiosk.html',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'mapping-global-society.png',
            'type': 'iframe'
          },
          {
            'id': 'charting-culture',
            'title': 'Charting Culture (12)',
            'subtitle': '2,600 years of human history in 5 minutes',
            'url': 'assets/videos/ChartingCulture.webm',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'charting-culture.jpg',
            'type': 'video'
          }
        ]
      }
    ]

//    var data = [
//      {
//        'id': 'earth',
//        'title': 'Earth',
//        'subtitle': 'Weather on a worldwide scale',
//        'url': 'http://earth.nullschool.net/?kiosk',
//        'instructions-template': 'instructions-earth.tmpl.html',
//        'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
//        'makers-template': 'makers-earth.tmpl.html',
//        'logo': 'earth.jpg',
//        'type': 'iframe'
//      },
//      {
//        'id': 'academy-scope',
//        'title': 'AcademyScope',
//        'subtitle': 'Exploring the scientific landscape',
//        'url': 'http://www.nap.edu/academy-scope/?kiosk=true',
//        'instructions-template': 'instructions-academy-scope.tmpl.html',
//        'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
//        'makers-template': 'makers-academy-scope.tmpl.html',
//        'logo': 'academy-scope.png',
//        'type': 'iframe'
//      },
//      {
//        'id': 'mapping-global-news',
//        'title': 'Mapping Global News',
//        'subtitle': 'Local news from a global perspective',
//        'url': 'http://data.gdeltproject.org/blog/news-cooccurrence-globe/globe_cooccur_kiosk.html',
//        'instructions-template': 'instructions-mapping-global-news.tmpl.html',
//        'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
//        'makers-template': 'makers-mapping-global-news.tmpl.html',
//        'logo': 'mapping-global-society.png',
//        'type': 'iframe'
//      },
//      {
//        'id': 'charting-culture',
//        'title': 'Charting Culture',
//        'subtitle': '2,600 years of human history in 5 minutes',
//        'url': 'assets/videos/ChartingCulture.webm',
//        'instructions-template': 'instructions-charting-culture.tmpl.html',
//        'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
//        'makers-template': 'makers-charting-culture.tmpl.html',
//        'logo': 'charting-culture.jpg',
//        'type': 'video'
//      }
//    ];

    console.log(findIterationsById(1));

    this.getIterations = getIterations;
    this.findIterationsById = findIterationsById;

    function getIterations() {
      return iteration;
    }

    // Util for finding an object by its 'id' property among an array
    function findIterationsById(iterSelect) {
      for (var i = 0; i < iteration.length; i++) {
        if (iteration[iterSelect].id=== iterSelect) {
          return iteration[i];
        }
      }
      return null;
    }

    this.getScopes = getScopes;
    this.findById = findById;

    function getScopes(iterSelect) {
      return iteration[iterSelect].data;
    }

    // Util for finding an object by its 'id' property among an array
    function findById(iterSelect,id) {
      for (var i = 0; i < iteration[iterSelect].data.length; i++) {
        if (iteration[iterSelect].data[i].id === id) {
          return data[i];
        }
      }
      return null;
    }
  }

})();
