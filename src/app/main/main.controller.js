(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, $mdDialog, Idle, $scope, $state) {
    var vm = this;

    vm.awesomeThings = [];
    vm.getMacroTitleById = getMacroTitleById;
    vm.home = true;
    vm.showIdleOverlay = false;
    
    var infoText = '<h4>What is a macroscope?</h4> <p>Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these <em>scopes</em> allow us to view objects that are either too small or too distant for the naked eye.</p> <p>Similarly, macroscopes are tools that help us focus on patterns in data that are too large or complex to see unaided. Interactive by nature, anyone can use them to visually explore data and ask and answer new questions.</p>';
    
    vm.showInfo = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template: 
          '<md-dialog>' + 
          '<md-toolbar class="md-toolbar-tools"><h2>Info</h2></md-toolbar>' +
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
    
    
    
    
    $scope.$on('IdleStart', function() {
      // the user appears to have gone idle
      
      // navigate to home page
      $state.go('home.grid');
      
      // show idle overlay
      vm.showIdleOverlay = true;
      
      console.log('idleStart');
    });

    $scope.$on('IdleWarn', function(e, countdown) {
      // follows after the IdleStart event, but includes a countdown until the user is considered timed out
      // the countdown arg is the number of seconds remaining until then.
      // you can change the title or display a warning dialog from here.
      // you can let them resume their session by calling Idle.watch()
      console.log('idleWarn');
    });

    $scope.$on('IdleTimeout', function() {
      // the user has timed out (meaning idleDuration + timeout has passed without any activity)
      console.log('idleTimeout');
      
      // hide idle overlay
      vm.showIdleOverlay = false;
      
      // restart idle
      Idle.watch();
    });

    $scope.$on('IdleEnd', function() {
      // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
      // hide idle overlay
      //vm.showIdleOverlay = false;
      
      console.log('idleEnd');
    });

    $scope.$on('Keepalive', function() {
      // do something to keep the user's session alive
      console.log('keepAlive');
    });
    
  }
})();
