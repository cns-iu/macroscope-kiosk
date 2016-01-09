'use strict';

describe('The main view: ', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
    page = require('./main.po');
    
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
    expect(page.header).toHaveClass('logo-bar-home');
    expect(page.title.getText()).toBe('MACROSCOPES FOR INTERACTING WITH SCIENCE');
    expect(page.logo).toHaveClass('logo-home');
    expect(page.idle.isDisplayed()).toBe(false);
    expect(page.cards.count()).toBe(4);
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
  
  it('should go to macro page when macro button is pressed', function() {
    expect(page.cards.first().element(by.css('button')).isPresent()).toBe(true);
    page.cards.first().element(by.css('button')).click();
    expect(page.cards.count()).toBe(0);
  });
  
  it('should go to macro page when macro footer button is pressed', function() {
    expect(page.cards.first().element(by.css('md-card-footer')).element(by.css('button')).isPresent()).toBe(true);
    page.cards.first().element(by.css('md-card-footer')).element(by.css('button')).click();
    expect(page.cards.count()).toBe(0);
  });
  
  it('should go to a macro page and set up macro state', function() {
    page.cards.first().element(by.css('button')).click();
    expect(page.header).toHaveClass('logo-bar-nothome');
    expect(page.title.getText()).toBe('EARTH');
    expect(page.logo).toHaveClass('logo-nothome');
  });

});
