(function() {
  'use strict';

  angular
      .module('macroscopeKiosk')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'id': 'earth',
        'title': 'Earth',
        'url': 'http://earth.nullschool.net/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'earth.png'
      },
      {
        'id': 'urban-observatory',
        'title': 'Urban Observatory',
        'url': 'http://www.urbanobservatory.org/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'urban-observatory.png'
      },
      {
        'id': 'ibm-think',
        'title': 'IBM Think!',
        'url': 'https://www.youtube.com/embed/8eu6DHBQyGs',
        'description': 'The streaming build system.',
        'logo': 'ibm-think.png'
      },
      {
        'id': 'mapping-global-society',
        'title': 'Mapping Global Society',
        'url': 'http://www.gdeltproject.org/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'mapping-global-society.png'
      },
      {
        'id': 'academy-scope',
        'title': 'Academy Scope',
        'url': 'http://www.nap.edu/academy-scope',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'academy-scope.png'
      },
      {
        'id': 'cultural-history',
        'title': 'A Cultural History',
        'url': 'https://www.youtube.com/embed/4gIhRkCcD4U',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'cultural-history.png'
      }
    ];

    this.getTec = getTec;
    this.findById = findById;

    function getTec() {
      return data;
    }
    
    // Util for finding an object by its 'id' property among an array
    function findById(id) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          return data[i];
        }
      }
      return null;
    }
  }

})();
