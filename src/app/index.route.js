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
          label: '.'
        }
      })
      .state('home.macro', {
        url: '/:iterationId/:macroId',
        templateUrl: 'app/components/macro/macro.html',
        controller: 'MacroController',
        controllerAs: 'macro',
        ncyBreadcrumb: {
          label: '{{macro.macroscope.title}}'

        }
      });
    $urlRouterProvider.otherwise('/');
  }

})();
