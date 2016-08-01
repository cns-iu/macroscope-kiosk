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
//        resolve:{
//          iterationId: ['$stateParams', function($stateParam){
//            return $stateParams.iterationId;
//          }]
//        },
        ncyBreadcrumb: {
          label:'iterationID'
        }
      })
      .state('home.macro', {
        url: ':iterationId/macro/:macroId',
        templateUrl: 'app/components/macro/macro.html',
        controller: 'MacroController',
        controllerAs: 'macro',
        ncyBreadcrumb: {
          label:'{{macroscope.id}}',
          parent:'home.grid'
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
