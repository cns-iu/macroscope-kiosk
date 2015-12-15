(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .config(config);

  /** @ngInject */
  function config($logProvider, IdleProvider, KeepaliveProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // configure idle settings
    IdleProvider.idle(10);
    IdleProvider.timeout(10);
    KeepaliveProvider.interval(1);
  }

})();
