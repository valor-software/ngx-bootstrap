import { BaseComponent } from './base.component';

export class DatepickerPo extends BaseComponent {
  pageUrl = '/datepicker';
  pageTitle = 'Datepicker';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';

  datepickerInput = 'input[bsdatepicker]';
  daterangepickerInput = 'input[bsdaterangepicker]';
  datepickerLastOpened = 'bs-datepicker-container:last';
  daterangepickerLastOpened = 'bs-daterangepicker-container:last';
  datepickerDays = '[bsdatepickerdaydecorator]';
  formOutput = '.code-preview';

  exampleDemosArr = {
    basic: 'demo-datepicker-basic',
    customFormat: 'demo-date-picker-custom-format',
    reactiveForms: 'demo-datepicker-reactive-forms'
  };

  clickOnDayInCurrMonth(datepicker: string, day: string) {
    cy.get(`${ datepicker } ${ this.datepickerDays}`)
      .not('.is-other-month')
      .contains(day).click();
  }
}
