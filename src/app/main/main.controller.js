(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, macroscopes, $mdDialog, Idle, $scope, $state) {
    var mc = this;

    mc.iterations = [];
    mc.iterationScopes=[];
    mc.getMacroTitleById = getMacroTitleById;
    mc.getIterationTitleById = getIterationTitleById;
    mc.getMacroDescriptionById= getMacroDescriptionById;
    mc.getIterationScopes = getIterationScopes;
    

    // mc.macroscope = macroscopes.getIterationScopes($stateParams.iterationId);
    // mc.iteration  = macroscopes.findIterationsById($stateParams.iterationId);

    // console.log(macroscopes.getIterationScopes(id));
    // console.log(macroscopes.findIterationsById('iteration13'));
    // console.log(mc.iteration);


    mc.home=true;
    mc.iteration=null;
    mc.macroscope=null;
    mc.idleImgURL=null;
    mc.showIdleOverlay = false;
    mc.primaryHeader=primaryHeader;
//    mc.$stateParams=$stateParams;

    var infoText = { 
                     title:'General information',
                     descriptionTitle:'<p>What is a macroscope?</p>',
                     description: '<p>A macroscope is a software tool that helps one see patterns and trends in data that are too large or complex to detect unaided.</p>',
                     descriptionLong:'<p>Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these scopes allow you to view objects that are either too small or too distant for the naked eye.</p><p>Similarly, macroscopes are tools that help you focus on patterns in data that are too large or complex to see unaided. Interactive by nature, you can use them to visually explore data and to ask and answer new questions.</p>'
                   };

    mc.showInfo = function(info) {
      $mdDialog.show({
        controller: DialogController,
        // scope: $scope,
        // preserveScope: true,
        template:
          '<md-dialog id="infoDialog">' +
          '<md-toolbar layout="row" layout-align ="space-between" class="md-toolbar-tools "><h2 class ="info-title">'+info.descriptionTitle+'</h2>'+
          '</md-toolbar>' +
          '<md-dialog-content class="infoDialog-font" layout="column">' + 
          info.description + 
          '<section class="ac-container">'+
          '<div>'+
          '<input id="ac-1" name="accordion-1" type="checkbox" analytics-on="click" analytics-event="'+info.title+'" analytics-category="Extended_info" />'+
          '<label for="ac-1">MORE INFORMATION ></label>'+
          '<article class="ac-small">'+
          '<p>'+info.descriptionLong+'</p>'+
          '</article>'+
          '</div>'+
          '</section>'+
          '</md-dialog-content>' +
          '</md-dialog>',
        targetEvent: info,
        openFrom: '#infoButton',
        closeTo: '#infoButton',
        clickOutsideToClose:true
      });
    };
    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }
    function primaryHeader(id){
      if (id ==="home"){
        mc.iteration=false;
        mc.macroscope=false;
        mc.home = true;
      }
      if (id ==="iteration"){
        mc.home=false;
        mc.macroscope=false;
        mc.iteration=true;
      }
      if (id==="macroscope"){
        mc.home=false;
        mc.iteration=false;
        mc.macroscope=true;
      }
    }

    activate();

    function activate(){
      //getMacroscopes();
      getIterations();
      // getAllScopes();
      $timeout(function() {
        mc.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getIterations() {
      mc.iterations = macroscopes.getIterations();
    }

    // function getAllScopes() {
    //   mc.iterationScopes = macroscopes.getScopes();
    //   console.log(mc.iterationScopes);
    // }

    function getIterationScopes(id) {
      mc.iterationScopes = macroscopes.getIterationScopes(id);
      return mc.iterationScopes;
    }

    function getIterationTitleById(id) {
      var iterationTitle = macroscopes.findIterationsById(id);

      if (iterationTitle) {
        return iterationTitle;
      } else {
        return 'Iteration Needs Title';
      }
    }

   function getMacroDescriptionById(id){
     var macroDesc = macroscopes.findById(id);
     if (macroDesc){
       var description = macroDesc.description;
       var title = macroDesc.title;
       var descriptionTitle = macroDesc.descriptionTitle;
       var descriptionLong =  macroDesc.descriptionLong;
       return {
         title: title,
         descriptionTitle: descriptionTitle,
         description: description,
         descriptionLong:descriptionLong
         
       };
     } else {
       return infoText;
     }
   }

  function getMacroTitleById(id) {
    var macroTitle = macroscopes.findById(id);

    if (macroTitle) {
      return macroTitle.title;
    } else {
      return 'General Information';
    }
  }

    //Img switch variables
    var changeTimer;
    var idleImg =[];
      idleImg[0] = "overlay1";
      idleImg[1] = "overlay2";
    var x = null;

    //Sets Switch interval for overlay Images
    function changeImg() {
      x = 0;
      changeTimer = setInterval(changeURL, 30000);
    }

    //Switches URL with idleImg Array
    function changeURL(){
      if(x >= idleImg.length -1){
        x = 0;
      } else{
        x++;
      }
      mc.idleImgURL = idleImg[x];
      $scope.$apply();
    }

    //Stops interval
    function stopChangeImg(){
      clearInterval(changeTimer);
    }

    // the user appears to have gone idle
    $scope.$on('IdleStart', function() {
      // close any open dialogs
      $mdDialog.hide();
      // navigate to home page
      $state.go('home.iteration');
      // Starts interval
      mc.idleImgURL = idleImg[0];
      changeImg();
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

    // the user has timed out (meaning idleDuration + timeout has passed without any activity)
    $scope.$on('IdleTimeout', function() {

      // hide idle overlay
      mc.showIdleOverlay = false;
      $scope.$apply();

      // restart idle
      Idle.watch();
    });

    // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    $scope.$on('IdleEnd', function() {
      //Stops timer
      stopChangeImg();
      // hide idle overlay
      mc.idleImgURL = null;
      $scope.$apply();
      //mc.showIdleOverlay = false;
      //console.log('idleEnd');
    });

    $scope.$on('Keepalive', function() {
      // do something to keep the user's session alive
      //console.log('keepAlive');
    });

  //  console.log("Iteration: " + mc.iterations);

  //  console.log("IterationScope: " + mc.iterationScopes);


  //  console.log("Home: " + mc.home);
  //  console.log("Iteration: " + mc.iterations);
  //  console.log("Macroscope: " + mc.macroscope);
  //  console.log("stateParams:  " + $stateParams);

  }
})();
