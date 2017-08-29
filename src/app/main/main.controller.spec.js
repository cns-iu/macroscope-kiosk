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
            'type': 'iframe',
            'descriptionTitle':'<p>Spin the globe. Find a place. </p>',
            'descriptionLong':'<p>Whether we like it or complain about it, bask in it or suffer from it, we all are affected by the weather. This essential truth becomes readily apparent when viewing <em>Earth</em>, the work of software engineer Cameron Beccario.</p><p>Using data from the Global Forecast System, <em>Earth</em> visualizes worldwide weather patterns using animated wind streams, color coded according to velocity, that sweep across a three-dimensional globe. Spin the globe and zoom in on a desired location. Tap that location to bring up further information about exact coordinates, wind speed, and temperature, with all information updated every three hours. See the world from different perspectives by changing the projection to stereographic or Waterman Butterfly.</p><p> When <em>Earth</em> was first introduced in December 2013, it only visualized wind patterns. Since then, however, Beccario has added new overlays that show carbon monoxide concentration, dust and sulfate extinction, and measured temperature. <em>Earth</em> also shows the perceived temperature which Beccario calls the Misery Index, borrowing a term from economics.</p>',
            'description':'<p>Watch the weather unfold in near real-time. Touch the menu in the lower left to see wave height, pollution levels, temperature, and more.</p>'
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
