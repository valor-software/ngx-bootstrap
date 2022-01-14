import { BaseComponent } from './base.component';

export class ButtonsPo extends BaseComponent {
  pageUrl = '#/components/buttons';
  pageTitle = 'Buttons';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/buttons';

  buttonNames = [
    'Left',
    'Middle',
    'Right'
  ];

  output = '.card-header';
  buttonGroupSelector = '.btn-group';
  btnRadioGroup = '[btnradiogroup]';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-buttons-basic',
    checkbox: 'tab[heading="Overview"] demo-buttons-checkbox',
    customCheckboxVal: 'tab[heading="Overview"] demo-custom-checkbox-value',
    checkboxWithForms: 'tab[heading="Overview"] demo-buttons-checkbox-reactiveforms',
    radioUnckeckable: 'tab[heading="Overview"] demo-buttons-radio-uncheckable',
    radioBtn: 'tab[heading="Overview"] demo-buttons-radio',
    radioBtnWithGroup: 'tab[heading="Overview"] demo-buttons-radio-with-group',
    radioBtnWithForms: 'tab[heading="Overview"] demo-buttons-radio-reactiveforms',
    disabled: 'tab[heading="Overview"] demo-buttons-disabled'
  };

  isButtonVisible(baseSelector: string, buttonName: string, btnSelector: string) {
    cy.get(`${baseSelector} ${btnSelector}`).contains(buttonName).should('to.be.visible');
  }

  isButtonEnabled(baseSelector: string, buttonName: string, enabled = true) {
      cy.get(`${baseSelector}`).contains(buttonName).should(enabled ? 'not.to.have.attr' : 'to.have.attr', 'disabled');
  }

  isButtonClassActive(baseSelector: string, buttonName: string, result: string, btnSelector: string) {
    cy.get(`${baseSelector} ${btnSelector}`).contains(buttonName).should('to.have.class', `${result}`);
  }

  isButtonHaveNoClass(baseSelector: string, buttonName: string, result: string, btnSelector: string) {
    cy.get(`${baseSelector} ${btnSelector}`).contains(buttonName).should('not.to.have.class', `${result}`);
  }

  isBtnOutputSelected(baseSelector: string, buttonNumber: number, result: boolean) {
    cy.get(`${baseSelector} ${this.output}`).should('to.contain', `"${ this.buttonNames[buttonNumber].toLowerCase() }": ${result}`);
  }
}
