(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        abstract: true
      })
      .state('home.iteration', {
        url: '/',
        templateUrl: 'app/components/iteration/iteration.html',
        ncyBreadcrumb: {
          label:'Home Page'
        }
      })
      .state('home.grid', {
        url: '/grid/:iterationId',
        templateUrl: 'app/components/grid/grid.html',
        controller: 'GridController',
        controllerAs: 'grid',
        ncyBreadcrumb: {
          label:'home.grid'
        }
      })
      .state('home.grid.macro', {
        url: '/macro/:macroId',
        templateUrl: 'app/components/macro/macro.html',
        controller: 'MacroController',
        controllerAs: 'macro',
        ncyBreadcrumb: {
          label:':macroId',
          parent:'home.grid'
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
