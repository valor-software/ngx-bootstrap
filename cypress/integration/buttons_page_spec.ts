import { ButtonsPo } from '../support/buttons.po';

describe('Buttons page test suite', () => {
  const buttons = new ButtonsPo();
  const buttonNames = [
    'Left',
    'Middle',
    'Right'
  ];

  beforeEach(() => buttons.navigateTo());

  describe('Basic', () => {
    const basicBtn = buttons.exampleDemosArr.basic;
    const btnText = 'Single Button';

    it('example contains only enabled button with text on it', () => {
      cy.get(` ${ basicBtn } ${ buttons.buttonSel }`)
        .should('to.be.enabled')
        .and('to.contain', btnText);
    });
  });

  describe('Checkbox', () => {
    const checkboxDemo = buttons.exampleDemosArr.checkbox;

    it('checkboxes can be checked or unchecked', () => {
      cy.get(`${ checkboxDemo } ${ buttons.output }`).as('output')
        .should('to.contain', `"${ buttonNames[1].toLowerCase() }": true`);
      buttons.clickByText(checkboxDemo, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": false`);

        buttons.clickByText(checkboxDemo, button);
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": true`);
      });
    });
  });

  describe('Custom checkbox value', () => {
    const customCheckboxVal = buttons.exampleDemosArr.customCheckboxVal;

    it('examples contains output, which can be changed by click on output', () => {
      const defaultVal = '1';
      const afterClickVal = '0';

      cy.get(` ${ customCheckboxVal } ${ buttons.output }`).as('header')
        .should('to.contain', defaultVal);

      cy.get(` ${ customCheckboxVal } ${ buttons.buttonSel }`).click();
      cy.get('@header')
        .should('to.contain', afterClickVal);
    });
  });

  describe('Checkbox with Reactive Form', () => {
    const checkboxWithForm = buttons.exampleDemosArr.checkboxWithForms;

    it('checkboxes can be checked or unchecked and its\' states are displayed at reactive form', () => {
      cy.get(` ${ checkboxWithForm } ${ buttons.output }`).as('output')
        .should('to.contain', `"${ buttonNames[1].toLowerCase() }": true`);
      buttons.clickByText(checkboxWithForm, buttonNames[1]);

      buttonNames.forEach(button => {
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": false`);

        buttons.clickByText(checkboxWithForm, button);
        cy.get('@output')
          .should('to.contain', `"${ button.toLowerCase() }": true`);
      });
    });
  });

  describe('Radio buttons', () => {
    const radioCheck = buttons.exampleDemosArr.radioBtn;

    it('checked radio button created with ngModel is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names and classes
      cy.get(radioCheck).eq(0).as('radio').find('.btn-group').first().as('radioNgModel');

      buttonNames.forEach(name => {
        buttons.clickByText('@radioNgModel', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });

    it('checked radio buttons created with btnRadioGroup is displayed in output', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioCheck).eq(0).as('radio').find(`${ buttons.btnRadioGroupSel }`).as('checkBtnRadioGroup');

      buttonNames.forEach(name => {
        buttons.clickByText('@checkBtnRadioGroup', name);

        cy.get(`${ '@radio' }${ buttons.output }`)
          .should('to.contain', name);
      });
    });
  });

  describe('Uncheckable radio', () => {
    const radioUncheck = buttons.exampleDemosArr.radioBtn;

    it('uncheckable radio buttons can be checked or unchecked', () => {
      // for now we need creating this alias due to same selectors' names
      cy.get(radioUncheck).eq(1).as('radioUncheck').find(`${ buttons.btnRadioGroupSel }`).as('uncheckBtnRadio');

      buttonNames.forEach(name => {
        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.contain', name);

        buttons.clickByText('@uncheckBtnRadio', name);

        cy.get(`${ '@radioUncheck' }${ buttons.output }`)
          .should('to.be', null);
      });
    });
  });

  describe('Radio with Reactive Forms', () => {
    const radioWithForm = buttons.exampleDemosArr.radioBtnWithForms;

    it('radio example should dynamicly update reactive form', () => {
      const btns = ['A', 'B', 'C'];

      btns.forEach(radio => {
        buttons.clickByText(radioWithForm, radio);

        cy.get(`${ radioWithForm } ${ buttons.output }`)
          .should('to.contain', radio);
      });
    });
  });

  describe('Disabled Buttons', () => {
    const disabled = buttons.exampleDemosArr.disabled;
    const togglerBtn = 'Enable/Disable';
    const btnForAction = 'Button';

    it('disabled buttons examples contains button, that can be disabled', () => {
      cy.get(disabled).contains(btnForAction).as('btnForDisabling')
        .should('to.be.enabled');
      buttons.clickByText(disabled, togglerBtn);

      cy.get('@btnForDisabling')
        .should('not.to.be.enabled');
    });
  });
});
