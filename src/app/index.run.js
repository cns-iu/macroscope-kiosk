(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
