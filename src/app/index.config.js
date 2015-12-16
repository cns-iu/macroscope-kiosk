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
    IdleProvider.idle(30);
    IdleProvider.timeout(5);
    KeepaliveProvider.interval(1);
  }

})();
