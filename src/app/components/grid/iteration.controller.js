(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('IterationController', IterationController);

  /** @ngInject */
  function IterationController($scope, $stateParams, macroscope, $mdDialog, $document, $sce) {
    var ms = this;
    ms.macroscope = macroscope.getIterationScopes($stateParams.iterationId);
//    ms.iterations = macroscope.findIterationsById($stateParams.iterationId);


    $scope.main.home = false;


//    ms.showDialog = function(ev, title, key) {
//      $mdDialog.show({
//        controller: DialogController,
//        templateUrl: 'app/components/macro/templates/digging-deeper-academy-scope.tmpl.html',
//        parent: angular.element($document.body),
//        targetEvent: ev,
//        clickOutsideToClose:true
//      });
//    };
//
//    function DialogController($scope, $mdDialog) {
//      $scope.hide = function() {
//        $mdDialog.hide();
//      };
//    }
  }
})();
