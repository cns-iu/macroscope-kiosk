(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, macroscopes, $mdDialog, Idle, $scope, $state) {



    var mc = this;

    mc.macroscopePagination = null;
    mc.getMacroTitleById = getMacroTitleById;
    mc.getMacroDescriptionById = getMacroDescriptionById;
    mc.getAllScopes = getAllScopes;
    mc.home = true;
    mc.iterationScopes = [];
    mc.ScopePages = [];
    mc.macroscope = null;
    mc.idleImgURL = null;
    mc.showIdleOverlay = false;
    mc.primaryHeader = primaryHeader;
    //    mc.$stateParams=$stateParams;




    var infoText = {
      title: 'General information',
      descriptionTitle: '<p>What is a macroscope?</p>',
      description: '<p>A macroscope is a software tool that helps one see patterns and trends in data that are too large or complex to detect unaided.</p>',
      descriptionLong: '<p>Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these scopes allow you to view objects that are either too small or too distant for the naked eye.</p><p>Similarly, macroscopes are tools that help you focus on patterns in data that are too large or complex to see unaided. Interactive by nature, you can use macroscopes to visually explore data and to ask and answer new questions.</p>'
    };

    mc.showInfo = function(info) {
      $mdDialog.show({
        controller: DialogController,
        // scope: $scope,
        // preserveScope: true,
        template: '<md-dialog id="infoDialog">' +
          '<md-toolbar layout="row" layout-align ="space-between" class="md-toolbar-tools "><h2 class ="info-title">' + info.descriptionTitle + '</h2>' +
          '</md-toolbar>' +
          '<md-dialog-content class="infoDialog-font" layout="column">' +
          info.description +
          '<section class="ac-container">' +
          '<div>' +
          '<input id="ac-1" name="accordion-1" type="checkbox" analytics-on="click" analytics-event="' + info.title + '" analytics-category="Extended_info" />' +
          '<label for="ac-1">MORE INFORMATION <img class="rotate_arrow" src="assets/images/accordion_arrow.png" alt="arrow"></label>' +
          '<article class="ac-small">' +
          '<p>' + info.descriptionLong + '</p>' +
          '</article>' +
          '</div>' +
          '</section>' +
          '</md-dialog-content>' +
          '</md-dialog>',
        targetEvent: info,
        openFrom: '#infoButton',
        clickOutsideToClose: true
      });
    };

    mc.scrollTo = function(ind) {
      mc.macroscopePagination.forEach(function(d, i) {
        d.active = "";
        if (d.pos == ind) {
          d.active = "active";
          scrollTo(
            document.getElementById('scopes-container'), 
            ((mc.macroscopePagination.length - 1) - d.pos) * 1920, 
            500
          )

        }
      });

    }


  function scrollTo(element, to, duration) {
      var start = element.scrollLeft,
          change = to - start,
          currentTime = 0,
          increment = 20;
          
      var animateScroll = function(){        
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          element.scrollLeft = val;
          if(currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };
      animateScroll();
  }


  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };


    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
    }

    function primaryHeader(id) {
      if (id === "home") {
        mc.iteration = false;
        mc.macroscope = false;
        mc.home = true;
      }
      if (id === "iteration") {
        mc.home = false;
        mc.macroscope = false;
        mc.iteration = true;
      }
      if (id === "macroscope") {
        mc.home = false;
        mc.iteration = false;
        mc.macroscope = true;
      }
    }

    activate();

    function activate() {
      getAllScopes();
      mc.macroscopePagination = macroscopes.createPaginationArr();
      $timeout(function() {
        mc.classAnimation = 'rubberBand';
      }, 4000);
      //createCircles(mc.iterationScopes.length / 4);
    }

    function getAllScopes() {
      mc.iterationScopes = macroscopes.getScopes();
    }


    function getMacroDescriptionById(macroscope) {

      if (macroscope) {
        return {
          title: macroscope.title,
          descriptionTitle: macroscope.descriptionTitle,
          description: macroscope.description,
          descriptionLong: macroscope.descriptionLong
        };
      }
      return infoText;
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
    var idleImg = [];
    idleImg[0] = "idle_overlay";
    idleImg[1] = "idle_overlay";
    var x = null;

    //Sets Switch interval for overlay Images
    function changeImg() {
      x = 0;
      changeTimer = setInterval(changeURL, 30000);
    }

    //Switches URL with idleImg Array
    function changeURL() {
      if (x >= idleImg.length - 1) {
        x = 0;
      } else {
        x++;
      }
      mc.idleImgURL = idleImg[x];
      $scope.$apply();
    }

    //Stops interval
    function stopChangeImg() {
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

    // the user has timed out (meaning idleDuration + timeout has passed without any activity)
    $scope.$on('IdleTimeout', function() {

      // hide idle overlay
      mc.showIdleOverlay = false;
      $scope.$apply();

      // restart idle
      Idle
        .watch();
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
  }
})();
