import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();

  beforeEach(() => dropdowns.navigateTo());

  describe('Basic', () => {
    const basicDrop = dropdowns.exampleDemosArr.basic;
    const togglerText = 'Button dropdown';

    it('single button dropdown is shown after click on toggler', () => {
      dropdowns.clickByText(basicDrop, togglerText);
      cy.get(`${ basicDrop } ${ dropdowns.dropdownMenu }`).as('basicDropMenu')
        .should('to.have.class', dropdowns.showIndicator);

      dropdowns.clickByText(basicDrop, togglerText);
      cy.get('@basicDropMenu')
        .should('not.to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Trigger by tag \<\a\>', () => {
    const triggerTag = dropdowns.exampleDemosArr.triggerByTag;
    const linkTag = 'a';

    it('dropdowns can be triggered by tag a', () => {
      cy.get(`${ triggerTag } span`).as('triggerTag')
        .should('not.to.have.descendants', '.dropdown-menu');

      cy.get('@triggerTag').find(linkTag).as('link').click();
      cy.get('@triggerTag').find(dropdowns.dropdownMenu).as('linkDropMenu')
        .should('to.have.class', dropdowns.showIndicator);

      cy.get('@link').click();
      cy.get('@linkDropMenu')
        .should('not.to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Split button dropdowns', () => {
    const splitBtn = dropdowns.exampleDemosArr.splitButton;
    const buttonText = 'Action';

    it('dropdown could have split toggler button', () => {
      dropdowns.clickByText(splitBtn, buttonText);
      cy.get(`${ splitBtn } ${ dropdowns.dropdownMenu }`)
        .should('not.to.have.class', dropdowns.showIndicator);

      cy.get(`${ splitBtn } ${ dropdowns.dropdownToggler }`).click();
      cy.get(`${ splitBtn } ${ dropdowns.dropdownMenu }`)
        .should('to.have.class', dropdowns.showIndicator);
    });
  });

  describe('Disabled menu', () => {
    const disabled = dropdowns.exampleDemosArr.disabledMenu;
    const btnEnableDisable = 'Enable/Disable';

    it('dropdown button can be disabled', () => {
      dropdowns.clickByText(disabled, btnEnableDisable);
      cy.get(`${ disabled } ${ dropdowns.dropdownToggler }`)
        .should('not.to.be.enabled');
    });
  });
});
