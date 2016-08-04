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

    console.log("-- GridController: Get Iteration Scopes --");
    console.log(gc.macroscope);

//    $scope.main.state = "iteration";
//
//    $scope.main.home=false;
//    $scope.main.iteration=true;
//    $scope.main.macroscope=false;
//
//
    console.log("Home: " + $scope.main.home);
    console.log("Iteration: " + $scope.main.iteration);
    console.log("Macroscope: " + $scope.main.macroscope);


//
//    gc.sources = [
//      {src: $sce.trustAsResourceUrl("assets/videos/ChartingCulture.webm"), type: "video/webm"}
//    ];
//
//
//    gc.showDialog = function(ev, title, key) {
//      $mdDialog.show({
//        controller: DialogController,
//        templateUrl: 'app/components/macro/templates/' + ms.macroscope[key + '-template'],
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
//
//


  }
})();
