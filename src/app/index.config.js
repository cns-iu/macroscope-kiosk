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
    IdleProvider.idle(300);
    IdleProvider.timeout(30);
    KeepaliveProvider.interval(1);
  }

})();
