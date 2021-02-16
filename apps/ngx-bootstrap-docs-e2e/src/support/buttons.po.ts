import { BaseComponent } from './base.component';

export class ButtonsPo extends BaseComponent {
  pageUrl = '/buttons';
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
    basic: 'demo-buttons-basic',
    checkbox: 'demo-buttons-checkbox',
    customCheckboxVal: 'demo-custom-checkbox-value',
    checkboxWithForms: 'demo-buttons-checkbox-reactiveforms',
    radioUnckeckable: 'demo-buttons-radio-uncheckable',
    radioBtn: 'demo-buttons-radio',
    radioBtnWithGroup: 'demo-buttons-radio-with-group',
    radioBtnWithForms: 'demo-buttons-radio-reactiveforms',
    disabled: 'demo-buttons-disabled'
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
