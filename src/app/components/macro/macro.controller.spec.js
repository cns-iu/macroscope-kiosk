(function() {
  'use strict';

  describe('macro', function(){
    
    var scope, ctrl, macroscopes, data = {
      'id': 'earth',
      'title': 'Earth',
      'subtitle': 'Weather on a worldwide scale',
      'url': 'http://earth.nullschool.net/?kiosk',
      'instructions-template': 'instructions-earth.tmpl.html',
      'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
      'makers-template': 'makers-earth.tmpl.html',
      'logo': 'earth.jpg',
      'type': 'iframe'
    };

    beforeEach(module('macroscopeKiosk'));
    
    beforeEach(inject(function ($controller, $rootScope, _macroscopes_) {
      scope = $rootScope.$new();
      scope.main = { home: true };
      
      macroscopes = _macroscopes_;
      spyOn(macroscopes, 'findById').and.returnValue(data);
          
      ctrl = $controller('MacroController', {
        $scope: scope 
      });
    }));

    it('should set main.home to false', function() {
      expect(scope.main.home).toBeFalsy();
    });
    
    it('should set a sources array', function() {
      expect(angular.isArray(ctrl.sources)).toBeTruthy();
      expect(ctrl.sources.length === 1).toBeTruthy();
    });
    
    it('should fetch macroscope', function() {
      expect(ctrl.macroscope).toEqual(data);
    });
  });
})();
