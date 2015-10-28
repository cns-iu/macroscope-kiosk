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
        controller: ['$scope', '$stateParams', 'webDevTec', '$mdDialog',
                function ($scope, $stateParams, webDevTec, $mdDialog) {
                  var ms = this;
                  ms.macroscope = webDevTec.findById($stateParams.macroId);
                  
                  
                  $scope.showAlert = function(ev, title, key) {
                    console.log(ev);
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                    // to prevent interaction outside of dialog
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(title)
                        .content(ms.macroscope[key])
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Close')
                        .targetEvent(ev)
                    );
                  };
                }],
        controllerAs: 'macro'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
