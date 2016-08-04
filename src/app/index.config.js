(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .config(config);

  /** @ngInject */
  function config($logProvider, IdleProvider, KeepaliveProvider, $breadcrumbProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // configure idle settings
    IdleProvider.idle(300);
    IdleProvider.timeout(30);
    KeepaliveProvider.interval(1);

    //Breadcrumb Configuration
    $breadcrumbProvider.setOptions({
        prefixStateName: 'home.iteration',
        templateUrl:'app/main/templates/breadcrumb.html'
    });

  }


})();
