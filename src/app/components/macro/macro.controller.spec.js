(function() {
  'use strict';

  describe('macro', function(){
    
    var scope, ctrl;

    beforeEach(module('macroscopeKiosk'));
    
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      
      ctrl = $controller('MacroController', {
        $scope: scope 
      });
    }));

    /*it('should fetch the macroscope', function() {
      expect(ctrl.macroscope).toBeTruthy();
    });*/
  });
})();
