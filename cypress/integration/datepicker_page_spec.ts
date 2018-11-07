import { DatepickerPo } from '../support/datepicker.po';

describe('Datepicker demo page test suite', () => {
  const datepicker = new DatepickerPo();

  beforeEach(() => datepicker.navigateTo());

  describe('Basic', () => {
    const basic = datepicker.exampleDemosArr.basic;

    it('basic date- and daterangepicker can be opened by click on input', () => {
      cy.get(`${ basic } ${ datepicker.datepickerInput }`).click();
      cy.get(datepicker.datepickerLastOpened)
        .should('to.be.visible');

      cy.get(`${ basic } ${ datepicker.daterangepickerInput }`).click();
      cy.get(datepicker.daterangepickerLastOpened)
        .should('to.be.visible');
    });
  });

  describe('Custom date format', () => {
    const customFormat = datepicker.exampleDemosArr.customFormat;

    it('by default, today\'s date is displayed at first output in format YYYY-MM-DD', () => {
      const expectedDate = Cypress.moment().format('YYYY-MM-DD');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).first()
        .should('have.value', `${ expectedDate }`);
    });

    it('by default, today\'s date is displayed at second output in format MM/DD/YYYY', () => {
      const expectedDate = Cypress.moment().format('MM/DD/YYYY');

      cy.get(`${ customFormat } ${ datepicker.datepickerInput }`).eq(1)
        .should('have.value', `${ expectedDate }`);
    });
  });

  describe('Reactive forms', () => {
    const reactiveForms = datepicker.exampleDemosArr.reactiveForms;

    it('chosen in datepicker date can be displayed in reactive form', () => {
      const expectedDateValue = Cypress.moment().format('MMM DD, YYYY');
      const day = Cypress.moment().format('D');

      cy.get(`${ reactiveForms } ${ datepicker.datepickerInput }`).click();
      datepicker.clickOnDayInCurrMonth(`${ datepicker.datepickerLastOpened }`, day);

      cy.get(`${ reactiveForms } ${ datepicker.formOutput }`)
        .should('to.contain', `${ expectedDateValue }`);
    });
  });
});
