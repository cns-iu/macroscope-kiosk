(function() {
  'use strict';

  describe('main', function(){
    
    var scope, ctrl;

    beforeEach(module('macroscopeKiosk'));
    
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      
      ctrl = $controller('MainController', {
        $scope: scope 
      });
    }));

    it('should fetch 4 awesome things', function() {
      expect(angular.isArray(ctrl.awesomeThings)).toBeTruthy();
      expect(ctrl.awesomeThings.length === 4).toBeTruthy();
    });
    
    it('should set home to true', function() {
      expect(ctrl.home).toBeTruthy();
    });
    
    it('should set showIdleOverlay to false', function() {
      expect(ctrl.showIdleOverlay).toBeFalsy();
    });
  });
})();
