/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MacroPage = function() {
  this.header = element(by.css('#header'));
  this.title = element(by.css('#title'));
  this.logo = element(by.css('#logo'));
  this.idle = element(by.css('#idle'));
  
  this.infoButton = element(by.css('#infoButton'));
  this.infoDialog = element(by.css('#infoDialog'));
  this.infoCloseButton = element(by.css('#infoCloseButton'));
  
  this.instructionsButton = element(by.css('.instructionsButton'));
  this.diggingDeeperButton = element(by.css('.diggingDeeperButton'));
  this.makersButton = element(by.css('.makersButton'));
  this.homeButton = element(by.css('.homeButton'));
  
  this.macroDialog = element(by.css('.macroDialog'));
  this.macroCloseButton = element(by.css('.macroCloseButton'));
};

module.exports = new MacroPage();
