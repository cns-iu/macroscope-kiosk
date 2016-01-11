(function() {
  'use strict';

  describe('main', function(){
    
    var scope, ctrl, macroscopes, Idle, data = [
      {
        'id': 'earth',
        'title': 'Earth',
        'subtitle': 'Weather on a worldwide scale',
        'url': 'http://earth.nullschool.net/?kiosk',
        'instructions-template': 'instructions-earth.tmpl.html',
        'digging-deeper-template': 'digging-deeper-earth.tmpl.html',
        'makers-template': 'makers-earth.tmpl.html',
        'logo': 'earth.jpg',
        'type': 'iframe'
      }
    ];

    beforeEach(module('macroscopeKiosk'));
    
    beforeEach(inject(function ($controller, $rootScope, _macroscopes_, _Idle_) {
      scope = $rootScope.$new();
      
      macroscopes = _macroscopes_;
      spyOn(macroscopes, 'getScopes').and.returnValue(data);
      
      Idle = _Idle_;
      
      ctrl = $controller('MainController', {
        $scope: scope 
      });
    }));
    
    it('should fetch the awesome things', function() {
      expect(angular.isArray(ctrl.macroscopes)).toBeTruthy();
      expect(ctrl.macroscopes.length).toBe(1);
    });
    
    it('should set home to true', function() {
      expect(ctrl.home).toBeTruthy();
    });
    
    it('should set showIdleOverlay to false', function() {
      expect(ctrl.showIdleOverlay).toBeFalsy();
    });
    
    it('should show idle overlay on idleStart', function() {
      scope.$emit('IdleStart');
      expect(ctrl.showIdleOverlay).toBeTruthy();
    });
    
    it('should hide idle overlay on idleTimeout', function() {
      scope.$emit('IdleTimeout');
      expect(ctrl.showIdleOverlay).toBeFalsy();
    });
  });
})();
