(function() {
  'use strict';

  describe('main', function(){
    
    var scope, ctrl, webDevTec, data = [
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
    
    beforeEach(function() {
      webDevTec = {
        getTec: function() {
          return data;
        }
      };
      
      module(function($provide) {
        $provide.value('webDevTec', webDevTec);
      });
      
      spyOn(webDevTec, 'getTec').and.returnValue(data);
    });
    
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      
      ctrl = $controller('MainController', {
        $scope: scope 
      });
    }));
    
    it('should fetch the awesome things', function() {
      console.log(ctrl.awesomeThings);
      expect(angular.isArray(ctrl.awesomeThings)).toBeTruthy();
      expect(ctrl.awesomeThings.length === 1).toBeTruthy();
    });
    
    it('should set home to true', function() {
      expect(ctrl.home).toBeTruthy();
    });
    
    it('should set showIdleOverlay to false', function() {
      expect(ctrl.showIdleOverlay).toBeFalsy();
    });
  });
})();
