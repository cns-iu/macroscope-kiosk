(function() {
  'use strict';

  angular
      .module('macroscopeKiosk')
      .service('webDevTec', webDevTec);

  /** @ngInject */
  function webDevTec() {
    var data = [
      {
        'title': 'Earth',
        'url': 'http://earth.nullschool.net/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'earth.png'
      },
      {
        'title': 'Urban Observatory',
        'url': 'http://www.urbanobservatory.org/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'urban-observatory.png'
      },
      {
        'title': 'IBM Think!',
        'url': 'https://www.youtube.com/watch?v=8eu6DHBQyGs',
        'description': 'The streaming build system.',
        'logo': 'ibm-think.png'
      },
      {
        'title': 'Mapping Global Society',
        'url': 'http://www.gdeltproject.org/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'mapping-global-society.png'
      },
      {
        'title': 'Academy Scope',
        'url': 'http://www.nap.edu/academy-scope',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'academy-scope.png'
      },
      {
        'title': 'A Cultury History',
        'url': 'https://www.youtube.com/watch?v=4gIhRkCcD4U',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'cultural-history.png'
      }
    ];

    this.getTec = getTec;

    function getTec() {
      return data;
    }
  }

})();
