/// <reference types ="cypress"/>
require('cypress-xpath')

const element = require('./elements').elementsContractPanel

export function clickMenuDailyUserMetrics() {
  cy.xpath(element.btnDailyUserMetrcis).click();
}
