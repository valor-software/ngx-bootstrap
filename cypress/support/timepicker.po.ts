import { BaseComponent } from './base.component';

export class TimepickerPo extends BaseComponent {
  pageUrl = '/timepicker';
  pageTitle = 'Timepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';
  redAlertSelector = '.alert.alert-danger';
  greenAlertSelector = '.alert.alert-success';

  exampleDemosArr = {
    basic: 'demo-timepicker-basic',
    form: 'demo-timepicker-form',
    meridian: 'demo-timepicker-meridian',
    customMeridian: 'demo-timepicker-custom-meridian',
    minMax: 'demo-timepicker-min-max',
    toggleMinSec: 'demo-timepicker-seconds',
    disabled: 'demo-timepicker-disabled',
    readonly: 'demo-timepicker-readonly',
    customSteps: 'demo-timepicker-custom',
    customValidation: 'demo-timepicker-custom-validation',
    isValidEvent: 'demo-timepicker-isvalid',
    dynamic: 'demo-timepicker-dynamic',
    mousewheel: 'demo-timepicker-mousewheel',
    arrowKeys: 'demo-timepicker-arrowkeys',
    spinners: 'demo-timepicker-spinners',
    configDefaults: 'demo-timepicker-config'
  };

  isTimepickerVisible(baseSelector: string) {
    cy.get(`${baseSelector} timepicker table`)
      .should('be.visible');
  }

  isInputDisabled(baseSelector: string, inputIndex = 0, disabled = true) {
    cy.get(`${baseSelector} input`)
      .eq(inputIndex)
      .should(disabled ? 'to.be.disabled' : 'not.to.be.disabled');
  }

  isInputReadonly(baseSelector: string, inputIndex = 0, readonly = true) {
    cy.get(`${baseSelector} input`)
      .eq(inputIndex)
      .should(readonly ? 'to.have.attr' : 'not.to.have.attr', 'readonly');
  }

  isAlertContains(baseSelector: string, expectedText: string) {
    cy.get(`${baseSelector} .alert.alert-info`)
      .invoke('text')
      .should('to.contain', expectedText);
  }

  isAdditionalAlertContains(baseSelector: string, alertSelector: string, expectedText: string, alertIndex = 0) {
    cy.get(`${baseSelector} ${alertSelector}`).eq(alertIndex)
      .invoke('text')
      .should('to.contain', expectedText);
  }

  clickOnArrow(baseSelector: string, arrowType: 'up' | 'down', arrowIndex = 0) {
    cy.get(`${baseSelector} timepicker`)
      .find(arrowType === 'up' ? '.bs-chevron-up' : '.bs-chevron-down')
      .eq(arrowIndex)
      .click({ force: true });
  }

  triggerEventOnInput(baseSelector: string, event: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).trigger(event);
  }

  isInputHaveInvalidStatus(baseSelector: string, invalid: boolean, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex).as('Input');
    if (invalid) {
      cy.get('@Input').then(input => expect(input.attr('class')).to.contains('is-invalid'));
    } else {
      cy.get('@Input').then(input => expect(input.attr('class')).not.to.contains('is-invalid'));
    }
  }

  getMeridianValue(baseSelector: string) {
    return cy.get(`${baseSelector} button`).eq(0).invoke('text');
  }

  isArrowDisabled(baseSelector: string, arrowType: 'up' | 'down', arrowIndex = 0, disabled = true) {
    cy.get(`${baseSelector} timepicker`)
      .find(arrowType === 'up' ? '.bs-chevron-up' : '.bs-chevron-down')
      .eq(arrowIndex)
      .parent()
      .should(disabled ? 'to.have.class' : 'not.to.have.class', 'disabled');
  }

  getHoursIn12Format(date: Date): number {
    let hours = date.getHours();
    if (hours > 12) {
      return hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }

    return hours;
  }

  isInputValueContain(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    if (!Number(expectedTxt)) {
      cy.get(`${baseSelector} input`).eq(inputIndex).should('to.have.value', expectedTxt);
    } else {
      cy.get(`${baseSelector} input`).eq(inputIndex).then(input => {
        if (Number(input.val()) === Number(expectedTxt)) {
          expect(input.val()).to.contains(expectedTxt);
        } else if (Number(input.val()) + 1 === Number(expectedTxt)) {
          expect(Number(input.val()) + 1).to.equal(Number(expectedTxt));
        } else {
          expect(Number(input.val()) - 1).to.equal(Number(expectedTxt));
        }
      });
    }
  }

  isTimepickerInputVisible(baseSelector: string, type: 'minutes' | 'seconds', visible = true) {
    const placeholder = type === 'minutes' ? 'MM' : 'SS';
    cy.get(`${baseSelector} timepicker`)
      .find(`input[placeholder="${placeholder}"]`)
      .should(visible ? 'to.be.visible' : 'not.to.be.visible');
  }

  selectOption(baseSelector: string, optionValue: string | number, selectIndex: number) {
    cy.get(`${baseSelector} select`)
      .eq(selectIndex)
      .select(`${optionValue}`);
  }

  isInputValueVisible(baseSelector: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`)
      .eq(inputIndex)
      .should('to.be.visible')
      .then(input => expect(input.val()).to.be.not.empty);
  }

  pressKeyOnInput(baseSelector: string, keyToPress: string, inputIndex = 0) {
    cy.get(`${baseSelector} input`).eq(inputIndex)
      .type(keyToPress);
  }

  isInputPlaceholderContains(baseSelector: string, placeholder: string, inputIndex = 0) {
    cy.get(`${baseSelector} .bs-timepicker-field`).eq(inputIndex)
      .should('have.attr', 'placeholder', placeholder);
  }

  isBtnShowMeridianExist() {
    cy.get(`${'demo-timepicker-config button'}`).should('not.to.exist');
  }

  isArrowVisible(baseSelector: string, elementSelector: string, hidden: boolean, elementIndex = 0) {
    cy.get(`${baseSelector} ${elementSelector}`).eq(elementIndex)
      .should(hidden ? 'to.be.visible' : 'not.to.be.visible');
  }

  isElementExist(baseSelector: string, elementSelector: string, existInDOM: boolean, elementIndex = 0) {
    cy.get(`${baseSelector} ${elementSelector}`).eq(elementIndex)
      .should(existInDOM ? 'to.exist' : 'not.to.exist');
  }
}
