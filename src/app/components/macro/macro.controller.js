(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MacroController', MacroController);

  /** @ngInject */
  function MacroController($scope, $stateParams, webDevTec, $mdDialog) {
    var ms = this;
    ms.macroscope = webDevTec.findById($stateParams.macroId);


    $scope.showDialog = function(ev, title, key) {
      $mdDialog.show({
        controller: DialogController,
        template: 
          '<md-dialog>' + 
          '<md-dialog-content>' + ms.macroscope[key] + '</md-dialog-content>' + 
          '<div class="md-actions"><md-button ng-click="hide()" class="md-default">Close</md-button></div>' +
          '</md-dialog>',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };
    
    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }
  };
})();
