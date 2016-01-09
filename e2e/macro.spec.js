'use strict';

describe('The macro view: ', function () {
  var page;

  beforeEach(function () {
    browser.get('/#/macro/earth');
    page = require('./macro.po');
    
    this.addMatchers({
      toHaveClass: function (a) {
        return this.actual.getAttribute('class').then(function (cls) {
          var patt = new RegExp('(^|\\s)' + a + '(\\s|$)');
          return patt.test(cls);
        });
      }
    });
  });
  
  it('should set up home state', function() {
    expect(page.header).toHaveClass('logo-bar-nothome');
    expect(page.title.getText()).toBe('EARTH');
    expect(page.logo).toHaveClass('logo-nothome');
  });
  
  describe('The info dialog', function() {
    it('should open when info button is clicked', function() {
      expect(page.infoDialog.isPresent()).toBe(false);
      page.infoButton.click();
      expect(page.infoDialog.isPresent()).toBe(true);
    });
    
    it('should close when close button is clicked', function() {
      expect(page.infoDialog.isPresent()).toBe(false);
      page.infoButton.click();
      expect(page.infoDialog.isPresent()).toBe(true);
      page.infoCloseButton.click();
      expect(page.infoDialog.isPresent()).toBe(false);
    });
  });
  
  describe('The instructions dialog', function() {
    it('should open when instructions button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.instructionsButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
    });
    
    it('should close when close button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.instructionsButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
      page.macroCloseButton.click();
      expect(page.macroDialog.isPresent()).toBe(false);
    });
  });
  
  describe('The diggingDeeper dialog', function() {
    it('should open when diggingDeeper button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.diggingDeeperButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
    });
    
    it('should close when close button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.diggingDeeperButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
      page.macroCloseButton.click();
      expect(page.macroDialog.isPresent()).toBe(false);
    });
  });
  
  describe('The makers dialog', function() {
    it('should open when makers button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.makersButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
    });
    
    it('should close when close button is clicked', function() {
      expect(page.macroDialog.isPresent()).toBe(false);
      page.makersButton.click();
      expect(page.macroDialog.isPresent()).toBe(true);
      page.macroCloseButton.click();
      expect(page.macroDialog.isPresent()).toBe(false);
    });
  });
  
  it('should go home when home button is clicked', function() {
    page.homeButton.click();
    expect(page.homeButton.isPresent()).toBe(false);
  });

});
