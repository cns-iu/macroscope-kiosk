(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MacroController', MacroController);

  /** @ngInject */
  function MacroController($scope, $stateParams, webDevTec, $mdDialog) {
    var ms = this;
    ms.macroscope = webDevTec.findById($stateParams.macroId);


    ms.showDialog = function(ev, title, key) {
      $mdDialog.show({
        controller: DialogController,
        template: 
          '<md-dialog>' + 
          '<md-toolbar class="md-toolbar-tools"><h2>' + title + '</h2></md-toolbar>' +
          '<md-dialog-content>' + ms.macroscope[key] + '</md-dialog-content>' + 
          '<div class="md-actions"><md-button ng-click="hide()" class="md-default">Close</md-button></div>' +
          '</md-dialog>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };
    
    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    };
  };
})();
