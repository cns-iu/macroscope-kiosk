(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('IterationController', IterationController);

  /** @ngInject */
  function IterationController($scope, $stateParams, macroscope, $mdDialog, $document, $sce) {
    var ms = this;
    ms.iterations = macroscope.findIterationsById($stateParams.iterationId);

    //ms.theme = "bower_components/videogular-themes-default/videogular.css";
    ms.sources = [
      {src: $sce.trustAsResourceUrl("assets/videos/ChartingCulture.webm"), type: "video/webm"}
    ];

    $scope.main.home = false;


    /*ms.createSrcArray = function(url) {
      var array = [
        {src: $sce.trustAsResourceUrl("assets/videos/ChartingCulture.webm"), type: "video/webm"}
      ];

      return array;
    };  */


    ms.showDialog = function(ev, title, key) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/components/macro/templates/digging-deeper-academy-scope.tmpl.html',
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
