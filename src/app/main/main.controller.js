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
    vm.showInfo = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('What is a macroscope?')
        .content('Have you ever looked at tiny plant cells through a microscope? Or peered into the night sky to see lunar craters with a telescope? Both of these scopes allow us to view objects that are either too small or too distant for the naked eye. Similarly, Macroscopes help us understand things too big or too complex for the human mind to grasp. They are able to bring sense and order to what might otherwise be an overwhelming amount of information. The term was first used in 1979 by Joel de Rosnay in his book The Macroscope: A New World Scientific System. In that book, the macroscope was the symbol of “a new way of seeing and understanding,” a tool “not used to make things larger or smaller but to observe what is at once too great, too slow, and too complex for our eyes.” As macroscopes become more sophisticated, more agile, and more interactive, that goal is moving closer to a realization. The macroscopes shown in this exhibit aim to empower visitors to see data in new ways, to understand the world in a more global and more comprehensive manner, and to use data mining and visualization tools in their daily decision making.')
        .ariaLabel('Info Dialog')
        .ok('Back')
        .targetEvent(ev)
    );
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

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
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
