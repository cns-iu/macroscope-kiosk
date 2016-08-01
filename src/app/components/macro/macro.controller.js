(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MacroController', MacroController);

  /** @ngInject */
  function MacroController($scope, $stateParams, macroscopes, $mdDialog, $document, $sce) {
    var ms = this;

    ms.macroscope = macroscopes.findById($stateParams.macroId);

    console.log("-- MacroController: Get Macroscope ID's --");
    console.log(ms.macroscopes);

    ms.sources = [
      {src: $sce.trustAsResourceUrl("assets/videos/ChartingCulture.webm"), type: "video/webm"}
    ];

    $scope.main.home = false;

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
  }
})();
