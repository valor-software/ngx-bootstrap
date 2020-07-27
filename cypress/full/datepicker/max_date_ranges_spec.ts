import {DatepickerPo} from '../../support/datepicker.po';

describe('Datepicker demo test suite: Max-Date-Range', () => {
  const datepicker = new DatepickerPo();
  const maxDateRange = datepicker.exampleDemosArr.maxDateRange;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Max Date Range in Daterangepicker');
  });

  it(`example contains 1 input of Daterangepicker`, () => {
    datepicker.isInputValueEqual(maxDateRange, '');
  });

  it(`when users selects start date, end date should be within 20 days from start date`,
     () => {
       const firstDate = new Date();
       const minDate = new Date();
       const maxDate = new Date();

       minDate.setDate(1);
       maxDate.setDate(firstDate.getDate() + 20);

       datepicker.clickOnDaterangepickerInput(maxDateRange);
       datepicker.isDaterangepickerOpened(true);

       datepicker.clickOnDaterangePickerTableItem(
           'date', 0, 'body', undefined, firstDate.getDate().toString());
       datepicker.isDayIntervalDisabledInCurrentMonthDateRange(
           minDate, maxDate, false);
       datepicker.isDayIntervalDisabledInNextMonthDateRange(
           minDate, maxDate, false);
     });
});
