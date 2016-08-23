(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MacroController', MacroController);

  /** @ngInject */
  function MacroController($scope, $stateParams, macroscopes, $mdDialog, $document, $sce) {
    var ms = this;
    ms.macroscope = macroscopes.findById($stateParams.macroId);
    ms.iteration  = macroscopes.findParent($stateParams.macroId);

//    $scope.main.state = "macroscope";
    $scope.main.iteration=false;
    $scope.main.macroscope=true;

    ms.sources = [
      {
        src: $sce.trustAsResourceUrl(ms.macroscope.url), type: "video/webm"
//        src: $sce.trustAsResourceUrl("assets/videos/ChartingCulture.webm"), type"video/webm"
      }
    ];

    ms.showDialog = function(ev, title, key) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/macro/templates/' + ms.macroscope[key + '-template'],
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }

    console.log("-- MacroController: Get Macroscope ID's --");
//    console.log(ms.macroscope);
//    console.log("stateParams:  " + $state.params);
    console.log("Home: " + $scope.main.home);
    console.log("Iteration: " + $scope.main.iteration);
    console.log("Macroscope: " + $scope.main.macroscope);

  }
})();
