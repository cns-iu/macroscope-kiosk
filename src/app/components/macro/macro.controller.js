(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MacroController', MacroController);

  /** @ngInject */
  function MacroController($scope, $stateParams, macroscopes, $mdDialog, $document, $sce) {
    var ms = this;
    ms.macroscopes = macroscopes.getScopes();
    ms.macroscope = macroscopes.findById($stateParams.macroId, $stateParams.iterationId);
    $scope.main.iteration = false;
    $scope.main.macroscope = true;
    ms.sources = [{
      src: $sce.trustAsResourceUrl(ms.macroscope.url),
      type: "video/webm"
    }];

    ms.showDialog = function(ev, title, key) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/macro/templates/' + ms.macroscope[key + '-template'],
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }
  }
})();
