(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, $mdDialog) {
    var vm = this;

    vm.awesomeThings = [];
    vm.getMacroTitleById = getMacroTitleById;
    vm.home = true;
    
    var infoText = '<h4>What is a macroscope?</h4> <p>Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these <em>scopes</em> allow us to view objects that are either too small or too distant for the naked eye.</p> <p>Similarly, macroscopes are tools that help us focus on patterns in data that are too large or complex to see unaided. Interactive by nature, anyone can use them to visually explore data and ask and answer new questions.</p>';
    
    vm.showInfo = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: 
          '<md-dialog>' + 
          '<md-dialog-content>' + infoText + '</md-dialog-content>' + 
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

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();
    }
    
    function getMacroTitleById(id) {
      var macroTitle = webDevTec.findById(id);
      
      if (macroTitle) {
        return macroTitle.title;
      } else {
        return 'Macroscopes for Interacting with Science';
      }
      
    }
  }
})();
