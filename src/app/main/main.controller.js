(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, macroscopes, $mdDialog, Idle, $scope, $state, $stateParams) {
    var mc = this;

//    mc.macroscopes = [];
    mc.getMacroTitleById = getMacroTitleById;
    mc.iterations = [];
    mc.getIterationTitleById = getIterationTitleById;
//    mc.state = "home";
    mc.headerOptions=headerOptions;
    mc.showIdleOverlay = false;
    mc.home=null;
    mc.iteration=null;
    mc.macroscope=null;
    mc.primaryHeader=primaryHeader;

    console.log("Home: " + mc.home);
    console.log("Iteration: " + mc.iteration);
    console.log("Macroscope: " + mc.macroscope);
//    if ((macroscopes.getIterationScopes("iteration11"))==null) {
//     console.log("YUP");
//    } else {
//      mc.macroscopes = macroscopes.getIterationScopes("iteration11");
//    }



    var infoText = '<h4>What is a macroscope?</h4> <p>Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these <em>scopes</em> allow us to view objects that are either too small or too distant for the naked eye.</p> <p>Similarly, macroscopes are tools that help us focus on patterns in data that are too large or complex to see unaided. Interactive by nature, anyone can use them to visually explore data and ask and answer new questions.</p>';

    mc.showInfo = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        template:
          '<md-dialog id="infoDialog">' +
          '<md-toolbar class="md-toolbar-tools"><h2>Info</h2></md-toolbar>' +
          '<md-dialog-content><h2>' + infoText + '</h2></md-dialog-content>' +
          '<div class="md-actions"><md-button id="infoCloseButton" ng-click="hide()" class="md-default">Close</md-button></div>' +
          '</md-dialog>',
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }

    function primaryHeader(id){
      if (id =="home"){
        mc.iteration=false;
        mc.macroscope=false;
        mc.home = true;
      }
      if (id =="iteration"){
        mc.home=false;
        mc.macroscope=false;
        mc.iteration=true;
      }
      if (id=="macroscope"){
        mc.home=false;
        mc.iteration=false;
        mc.macroscope=true;
      }
//      mc.$apply();
    }


    function headerOptions(id){

      if(mc.state == "home" & id == "header"){
         console.log("HOME");
        console.log(mc.home);
        return 'logo-bar-home';
      }
      if(mc.state == "iteration" & id == "header"){
         console.log("ITERATION");
        console.log(mc.home);
        return 'logo-bar-iteration';

      }
      if(mc.state == "macroscope" & id == "header"){
         console.log("MACROSCOPE");
        console.log(mc.home);
        return 'logo-bar-macro';
      }
    }



    activate();

    function activate(){
      //getMacroscopes();
      getIterations();
      $timeout(function() {
        mc.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getIterations() {
      mc.iterations = macroscopes.getIterations();
    }

    function getIterationTitleById(id) {
      var iterationTitle = macroscopes.findIterationsById(id);

      if (iterationTitle) {
        return iteration.title;
      } else {
        return 'Iteration Needs Title';
      }

    }



    function getMacroTitleById(id) {
      var macroTitle = macroscopes.findById(0,id);

      if (macroTitle) {
        return macroTitle.title;
      } else {
        return 'Macroscopes for Interacting with Science';
      }

    }




    $scope.$on('IdleStart', function() {
      // the user appears to have gone idle

      // close any open dialogs
      $mdDialog.hide();

      // navigate to home page
      $state.go('home.iteration');

      // show idle overlay
      mc.showIdleOverlay = true;

      //console.log('idleStart');
    });

    /*$scope.$on('IdleWarn', function(e, countdown) {
      // follows after the IdleStart event, but includes a countdown until the user is considered timed out
      // the countdown arg is the number of seconds remaining until then.
      // you can change the title or display a warning dialog from here.
      // you can let them resume their session by calling Idle.watch()
      //console.log('idleWarn');
    });*/

    $scope.$on('IdleTimeout', function() {
      // the user has timed out (meaning idleDuration + timeout has passed without any activity)
      //console.log('idleTimeout');

      // hide idle overlay
      mc.showIdleOverlay = false;

      // restart idle
      Idle.watch();
    });

    $scope.$on('IdleEnd', function() {
      // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
      // hide idle overlay
      //mc.showIdleOverlay = false;

      //console.log('idleEnd');
    });

    $scope.$on('Keepalive', function() {
      // do something to keep the user's session alive
      //console.log('keepAlive');
    });

  }
})();
