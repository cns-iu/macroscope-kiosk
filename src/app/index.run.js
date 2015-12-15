(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, $stateParams, Idle) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    
    $log.debug('runBlock end');
    
    Idle.watch();
  }

})();
