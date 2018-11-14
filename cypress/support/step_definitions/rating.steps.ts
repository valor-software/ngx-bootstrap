// TODO have no possibilities to use PageObject pattern here
// https://github.com/cypress-io/cypress-webpack-preprocessor/issues/41
// https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/issues/112

const basic = 'demo-rating-basic';
const tagRating = 'rating';
const outputClass = '.card-block';

Given(/^User opens Rating demo page$/, () => {
  cy.viewport(1440, 900);
  cy.visit('/rating');
});

Then(/^User see rating with "(.*)" stars$/, (stars) => {
  cy.get(`${ basic } ${tagRating}`).as('rating')
    .should('to.be.visible')
    .and('not.to.be.enabled');
  cy.get('@rating').find('span')
    .should('to.have.attr', 'aria-valuemax', stars);
});

Then(/^User see card with "(.*)" text$/, (cardText) => {
  cy.get(`${ basic } ${ outputClass }`)
    .should('to.have.text', cardText);
});

Then(/^First "(.*)" stars should be selected$/, (stars) => {
  cy.get('@rating').find('span')
    .should('to.have.attr', 'aria-valuenow', stars);
});

Then(/^"(.*)" stars not selected$/, (stars) => {
  cy.get('@rating').find('span')
    .should('to.have.attr', 'aria-valuenow', (10 - stars).toString());
});
