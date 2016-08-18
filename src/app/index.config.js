(function() {
  'use strict';

  angular
    .module('macroscopeKiosk')
    .config(config);

  /** @ngInject */
  function config($logProvider, IdleProvider, KeepaliveProvider, $breadcrumbProvider, cfpLoadingBarProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // configure idle settings
    IdleProvider.idle(300);
    IdleProvider.timeout(30);
    KeepaliveProvider.interval(1);

    //Loading Bar
    cfpLoadingBarProvider.latencyThreshold = 1;
    cfpLoadingBarProvider.includeSpinner = false;

    //Breadcrumb Configuration
    $breadcrumbProvider.setOptions({
        prefixStateName: 'home.iteration',
        templateUrl:'app/main/templates/breadcrumb.html'
    });

  }


})();
