(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('GridController', GridController);

  /** @ngInject */
  function GridController($scope, $stateParams, macroscopes) {
    var gc = this;
    gc.macroscope = macroscopes.getIterationScopes($stateParams.iterationId);
    console.log("-- GridController: Get Iteration Scopes --");
    console.log(gc.macroscope);
    $scope.main.home = false;

  }
})();
