import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo test suite: Inline Datepicker', () => {
  const datepicker = new DatepickerPo();
  const inlineDatepicker = datepicker.exampleDemosArr.inlineDatepicker;
  const todayDay = new Date().getDate();

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Inline');
  });

  it(`example contains Datepicker with selected date (Today)`, () => {
   datepicker.isDatepickerOpened(true, inlineDatepicker);
   datepicker.isSelectedDateExist('datepickerInline', true, inlineDatepicker, `${todayDay}`);
   datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth()], inlineDatepicker);
  });

  it(`when user clicks on any other date - then this date selected`, () => {
    const dayToChoose = todayDay >= 20 ? todayDay - 5 : todayDay + 5;
    datepicker.clickOnDatepickerTableItem('date', inlineDatepicker, undefined, `${dayToChoose}`);
    datepicker.isDatepickerOpened(true, inlineDatepicker);
    datepicker.isSelectedDateExist('datepickerInline', true, inlineDatepicker, `${dayToChoose}`);
    datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth()], inlineDatepicker);
  });

  it(`when user chose another month and chose there any date - then this date selected`, () => {
    datepicker.clickOnNavigation(inlineDatepicker, '>');
    datepicker.clickOnDatepickerTableItem('date', inlineDatepicker, undefined, `15`);
    datepicker.isSelectedDateExist('datepickerInline', true, inlineDatepicker, `15`);
    datepicker.isVisibleMonthOrYearEqual(datepicker.monthNames[new Date().getMonth() + 1], inlineDatepicker);
  });
});
