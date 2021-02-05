import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Select dates from other month', () => {
  const datepicker = new DatepickerPo();
  const selectDatesFromOtherMonths = datepicker.exampleDemosArr.selectFromOtherMonth;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Select dates from other month');
  });

  it(`example contains Datepicker input, template src should be written with
                 dateInputFormat: 'DD-MM-YYYY' and selectFromOtherMonth: true`, () => {
    datepicker.isInputHaveAttrs(selectDatesFromOtherMonths, [{ attr: 'placeholder', value: 'Datepicker' }]);
    datepicker.isTemplateSrcContain('Select dates from other month', `dateInputFormat: 'DD-MM-YYYY'`);
    datepicker.isTemplateSrcContain('Select dates from other month', `selectFromOtherMonth: true`);
  });

  it(`when user clicks on Datepicker input, bs-datepicker-container opens, when user clicks on any date
                 from previous month in this view, then this date chosen and appear in the input`, () => {
    const dateFromFirstMonth = '02-06-2019';
    const dateFromPreviousMonth = '26-05-2019';
    datepicker.clearInputAndSendKeys(selectDatesFromOtherMonths, dateFromFirstMonth);
    datepicker.clickEnterOnInput(selectDatesFromOtherMonths);
    datepicker.clickOnDatepickerInput(selectDatesFromOtherMonths);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', 1);
    datepicker.isInputValueContain(selectDatesFromOtherMonths, dateFromPreviousMonth);
  });

  it(`when user clicks on any date from next month in this view, then this date chosen and appear in the input
                 when user clicks on bs-datepicker-container again, then user see calendar with chosen month`, () => {
    const monthNextMonth = new Date().getMonth() === 11 ? '01' : (new Date().getMonth() + 2);
    const yearNextMonth = new Date().getMonth() === 11 ? (new Date().getFullYear() + 1) : new Date().getFullYear();
    datepicker.clickOnDatepickerInput(selectDatesFromOtherMonths);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', 47); // one of the latest days in each calendar view
    datepicker.isInputValueContain(selectDatesFromOtherMonths, `${monthNextMonth}-${yearNextMonth}`);
    datepicker.clickOnDatepickerInput(selectDatesFromOtherMonths);
    datepicker.isSelectedDateExist('datepicker', true, 'body');
    datepicker.isVisibleMonthOrYearEqual(`${datepicker.monthNames[Number(monthNextMonth) - 1]}`);
  });
});
