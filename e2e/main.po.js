/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.header = element(by.css('#header'));
  this.title = element(by.css('#title'));
  this.logo = element(by.css('#logo'));
  this.idle = element(by.css('#idle'));
  
  this.cards = element(by.css('body')).all(by.repeater('macroscope in main.macroscopes'));
  
  this.infoButton = element(by.css('#infoButton'));
  this.infoDialog = element(by.css('#infoDialog'));
  this.infoCloseButton = element(by.css('#infoCloseButton'));
};

module.exports = new MainPage();
