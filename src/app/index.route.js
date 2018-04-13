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
          label:'.'
        }
      })
      .state('home.grid', {
        url: '/:iterationId',
        templateUrl: 'app/components/grid/grid.html',
        controller: 'GridController',
        controllerAs: 'grid',
        ncyBreadcrumb: {
          label:'{{grid.iteration.title}}'
        }
      })

      .state('home.grid.macro', {
        url: '/:iterationId/:macroId',
        templateUrl: 'app/components/macro/macro.html',
        controller: 'MacroController',
        controllerAs: 'macro',
        // params: {iterationId: null, macroId: null},
        ncyBreadcrumb: {
//          parent:'home.grid ({iterationID: "macro.iteration.id"})',
          label:'{{macro.macroscope.title}}'

        }
      });






//       .state('home.grid.macro', {
//         url: '/macro/:macroId',
// //        views:{
// //          "@":{
//               templateUrl: 'app/components/macro/macro.html',
//               controller: 'MacroController',
//               controllerAs: 'macro',
// //            }
// //        },
//         ncyBreadcrumb: {
// //          parent:'home.grid ({iterationID: "macro.iteration.id"})',
//           label:'{{macro.macroscope.title}}'

//         }
//       });

    $urlRouterProvider.otherwise('/');
  }

})();
