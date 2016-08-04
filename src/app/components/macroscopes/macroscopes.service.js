(function () {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .service('macroscopes', macroscopes);

  /** @ngInject */
  function macroscopes() {
    var iteration = [
      {
        'id': 'iteration11',
        'logo': 'mapping-global-society.png',
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
        'id': 'iteration12',
        'logo': 'earth.jpg',
        'title': "Make Sense of Science",
        'subtitle': 'Iteration 12',
        'data': [
          {
            'id': 'smelly-maps',
            'title': 'Smelly Maps',
            'subtitle': 'Smelly Maps',
            'url': 'http://goodcitylife.org/smellymaps',
            'instructions-template': 'instructions-earth.tmpl.html',
            'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
            'makers-template': 'makers-earth.tmpl.html',
            'logo': 'earth.jpg',
            'type': 'iframe'
          },
          {
            'id': 'excellence-networks',
            'title': 'Excellence Networks',
            'subtitle': 'Excellence Networks',
            'url': 'http://excellencenetworks.net/multitouch/',
            'instructions-template': 'instructions-academy-scope.tmpl.html',
            'digging-deeper-template': 'digging-deeper-academy-scope.tmpl.html',
            'makers-template': 'makers-academy-scope.tmpl.html',
            'logo': 'academy-scope.png',
            'type': 'iframe'
          },
          {
            'id': 'hathitrust',
            'title': 'HathiTrust',
            'subtitle': 'HathiTrust',
            'url': 'http://data.gdeltproject.org/blog/news-cooccurrence-globe/globe_cooccur_kiosk.html',
            'instructions-template': 'instructions-mapping-global-news.tmpl.html',
            'digging-deeper-template': 'digging-deeper-mapping-global-news.tmpl.html',
            'makers-template': 'makers-mapping-global-news.tmpl.html',
            'logo': 'mapping-global-society.png',
            'type': 'iframe'
          },
//          {
//            'id': 'elastic-terrain',
//            'title': 'Elastic Terrain',
//            'subtitle': 'Elastic Terrain',
//            'url': 'http://us-west.elasticterrain.xyz/macroscope',
//            'instructions-template': 'instructions-charting-culture.tmpl.html',
//            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
//            'makers-template': 'makers-charting-culture.tmpl.html',
//            'logo': 'charting-culture.jpg',
//            'type': 'iframe'
//          },
          {
            'id': 'fleetmon',
            'title': 'FleetMon',
            'subtitle': 'FleetMon',
            'url': 'https://www.youtube.com/embed/CP-TcDtSFDI',
            'instructions-template': 'instructions-charting-culture.tmpl.html',
            'digging-deeper-template': 'digging-deeper-charting-culture.tmpl.html',
            'makers-template': 'makers-charting-culture.tmpl.html',
            'logo': 'charting-culture.jpg',
            'type': 'iframe'
          }
        ]
      }
    ];

    //    console.log(getIterations());
    //    console.log(getScopes());

    this.getIterations = getIterations;
    this.findIterationsById = findIterationsById;
    this.getScopes = getScopes;
    this.getIterationScopes = getIterationScopes;
    this.findById = findById;
    this.findParent = findParent;

    function getIterations() {
      return iteration;
    }

    // Util for finding an iteration object by its 'id' property among an array
    function findIterationsById(id) {
      for (var i = 0; i < iteration.length; i++) {
        if (iteration[i].id === id) {
          return iteration[i];
        }
      }
      return null;
    }

    // Util for finding all macroscopes
    function getScopes() {
      var allData = [];
      for (var i = 0; i < iteration.length; i++) {
        allData = allData.concat(iteration[i].data);
      }
      return allData;
    }

    // Util for finding macroscope data in a specific iteration
    function getIterationScopes(id) {
      var findScope = findIterationsById(id);
      return findScope.data;
    }

    // Util for finding any macroscope object by its 'id' property among an array
    function findById(id) {
      for (var i = 0; i < iteration.length; i++) {
        for (var k = 0; k < iteration[i].data.length; k++) {
          if (iteration[i].data[k].id === id) {
            return iteration[i].data[k];
          }
        }
      }
      return null;
    }

    // Util for finding Parent iteration of scope (for breadcrumbs)
    function findParent(id) {
      for (var i = 0; i < iteration.length; i++) {
        for (var k = 0; k < iteration[i].data.length; k++) {
          if (iteration[i].data[k].id === id) {
            return iteration[i];
          }
        }
      }
      return null;
    }
  }

})();
