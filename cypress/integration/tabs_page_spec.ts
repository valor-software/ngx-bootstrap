import { TabsPo } from '../support/tabs.po';

describe('Tabs demo page spec', () => {
  const tabs = new TabsPo();

  beforeEach(() => tabs.navigateTo());

  describe('Configuring defaults', () => {
    const configDemo = tabs.exampleDemosArr.config;
    const configComp = {
      type: 'nav-pills'
    };

    it('configuring defaults example contains added config', () => {
      cy.get(`${ configDemo } ${ tabs.tabsWrap }`)
        .should('to.have.class', configComp.type);
    });
  });
});
