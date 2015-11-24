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
      .state('home.grid', {
        url: '/',
        templateUrl: 'app/components/grid/grid.html'
      })
      .state('home.macro', {
        url: '/macro/:macroId',
        templateUrl: 'app/components/macro/macro.html',
        controller: 'MacroController',
        controllerAs: 'macro'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
