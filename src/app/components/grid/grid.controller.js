(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('GridController', GridController);

  /** @ngInject */
  function GridController($scope, $stateParams, macroscopes, $mdDialog, $document, $sce) {
    var gc = this;
    gc.macroscope = macroscopes.getIterationScopes($stateParams.iterationId);
    console.log(gc.macroscope);
    $scope.main.home = false;

  }
})();
