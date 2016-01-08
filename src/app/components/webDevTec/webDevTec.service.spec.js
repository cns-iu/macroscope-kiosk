(function() {
  'use strict';

  describe('webDevTec', function(){
    var webDevTec, earth = {
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
    
    beforeEach(inject(function (_webDevTec_) {
      webDevTec = _webDevTec_;
    }));

    it('should return the data', function() {
      var data = webDevTec.getTec();
      expect(angular.isArray(data)).toBeTruthy();
      expect(data.length).toBe(4);
    });
    
    it('should find earth by id', function() {
      expect(webDevTec.findById('earth')).toEqual(earth);
    });
    
    it('should find null by missing id', function() {
      expect(webDevTec.findById()).toBeNull();
      expect(webDevTec.findById('')).toBeNull();
      expect(webDevTec.findById('foo')).toBeNull();
    });
  });
})();
