import { BaseComponent } from './base.component';
import ObjectLike = Cypress.ObjectLike;
import TriggerOptions = Cypress.TriggerOptions;

export class TimepickerPo extends BaseComponent {
  pageUrl = '/timepicker';
  pageTitle = 'Timepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker';

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
    allowEmptyDate: 'demo-timepicker-empty-date',
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

  isAlertContains(baseSelector: string, expectedText: string, alertIndex = 0, alertType = 'info') {
    cy.get(`${baseSelector} .alert.alert-${alertType}`)
      .eq(alertIndex)
      .invoke('text')
      .should('to.contain', expectedText);
  }

  alertShouldNotExists(baseSelector: string, alertType = 'info') {
    cy.get(`${baseSelector} .alert.alert-${alertType}`)
      .should('not.exist');
  }

  setTimeInInputs(baseSelector: string, hourToSet: number | string, minuteToSet: number | string) {
    this.clearInputAndSendKeys(`${baseSelector} timepicker`, hourToSet.toString(), 0);
    this.clearInputAndSendKeys(`${baseSelector} timepicker`, minuteToSet.toString(), 1);
  }

  clickOnArrow(baseSelector: string, arrowType: 'up' | 'down', arrowIndex = 0) {
    cy.get(`${baseSelector} timepicker`)
      .find(arrowType === 'up' ? '.bs-chevron-up' : '.bs-chevron-down')
      .eq(arrowIndex)
      .click({ force: true });
  }

  triggerEventOnInput(baseSelector: string, event: string, inputIndex = 0, params?: Partial<TriggerOptions & ObjectLike>) {
    if (!params) {
      cy.get(`${baseSelector} input`).eq(inputIndex).trigger(event);
    } else {
      cy.get(`${baseSelector} input`).eq(inputIndex).trigger(event, params);
    }
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

  getHoursIn24Format(hours: number): number {
    if (new Date().getHours() >= 12) {
      return hours + 12;
    } else {
      return hours;
    }
  }

  isInputValueContain(baseSelector: string, expectedTxt: string, inputIndex = 0) {
    if (!Number(expectedTxt)) {
      cy.get(`${baseSelector} input`).eq(inputIndex).then(input => {
        expect(input.val()).to.contains(expectedTxt);
      });
    } else {
      cy.get(`${baseSelector} input`).eq(inputIndex).then(input => {
        if (Number(input.val()) === Number(expectedTxt)) {
          expect(input.val()).to.contains(expectedTxt);
        } else if (Number(input.val()) + 1 === Number(expectedTxt)) {
          expect((Number(input.val()) + 1).toString()).to.contains(expectedTxt.toString());
        } else {
          expect((Number(input.val()) - 1).toString()).to.contains(expectedTxt.toString());
        }
      });
    }
  }

  isTimepickerInputExist(baseSelector: string, type: 'minutes' | 'seconds', exist = true) {
    const placeholder = type === 'minutes' ? 'MM' : 'SS';
    cy.get(`${baseSelector} timepicker input[placeholder="${placeholder}"]`)
      .should(exist ? 'exist' : 'not.exist');
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
    cy.get(`${baseSelector} input`)
      .eq(inputIndex)
      .type(`{${keyToPress}arrow}`);
  }

  isInputPlaceholderContains(baseSelector: string, placeholder: string, inputIndex = 0) {
    cy.get(`${baseSelector} .bs-timepicker-field`)
      .eq(inputIndex)
      .should('have.attr', 'placeholder', placeholder);
  }

  isArrowVisible(baseSelector: string, arrowType: string, hidden: boolean, elementIndex = 0) {
    cy.get(`${baseSelector} .bs-chevron-${arrowType}`)
      .eq(elementIndex)
      .should(hidden ? 'to.be.visible' : 'not.to.be.visible');
  }
}
