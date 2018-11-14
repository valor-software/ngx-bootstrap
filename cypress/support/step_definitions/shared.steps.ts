// TODO have no possibilities to use typings here, like subMenu:string
When(/^User clicks on "(.*)" sub-menu$/, (subMenu) => {
  cy.get('add-nav').contains('a', subMenu).click();
});

When(/^User scrolls to "(.*)" sub-menu$/, (subMenu) => {
  cy.get('examples h3').contains(subMenu).scrollIntoView();
});
