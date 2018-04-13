(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('GridController', GridController);

  /** @ngInject */
  function GridController($scope, $stateParams, macroscopes) {
    var gc = this;
    gc.macroscope = macroscopes.getIterationScopes($stateParams.iterationId);
    gc.iteration  = macroscopes.findIterationsById($stateParams.iterationId);

// console.log("GC Macroscope:"+gc.macroscope.id);
// console.log("GC Iteration"+gc.iteration.id);

//    $scope.main.state = "iteration";
//
//    $scope.main.home=false;
//    $scope.main.iteration=true;
//    $scope.main.macroscope=false;

//    console.log("-- GridController: Get Iteration Scopes --");
//    console.log(gc.macroscope);
//    console.log("Home: " + $scope.main.home);
//    console.log("Iteration: " + $scope.main.iteration);
//    console.log("Macroscope: " + $scope.main.macroscope);
  }
})();
