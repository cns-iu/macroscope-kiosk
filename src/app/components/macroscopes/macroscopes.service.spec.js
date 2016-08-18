(function() {
  'use strict';

  describe('macroscopes', function(){
    var macroscopes, earth = {
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

    beforeEach(inject(function (_macroscopes_) {
      macroscopes = _macroscopes_;
    }));

    it('should return the data', function() {
      var data = macroscopes.getScopes();
      expect(angular.isArray(data)).toBeTruthy();
      expect(data.length).toBe(8);
    });

    it('should find earth by id', function() {
      expect(macroscopes.findById('earth')).toEqual(earth);
    });

    it('should find null by missing id', function() {
      expect(macroscopes.findById()).toBeNull();
      expect(macroscopes.findById('')).toBeNull();
      expect(macroscopes.findById('foo')).toBeNull();
    });
  });
})();
