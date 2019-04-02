import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo test suite: Min-max', () => {
  const datepicker = new DatepickerPo();
  const minMax = datepicker.exampleDemosArr.minMax;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Min-max');
  });

  it(`example contains 2 inputs: Datepicker and Daterangepicker`, () => {
    datepicker.isInputHaveAttrs(minMax, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isInputHaveAttrs(minMax, [{ attr: 'placeholder', value: 'Daterangepicker' }], 1);
  });

  it(`when user clicks on Datepicker input, then container opened and user can chose date from min-max`, () => {
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    maxDate.setDate(maxDate.getDate() + 7);
    datepicker.clickOnDatepickerInput(minMax);
    datepicker.isDatepickerOpened(true);
    datepicker.isDayIntervalDisabledInCurrentMonth(minDate, maxDate, false);
    if (minDate.getMonth() !== maxDate.getMonth()) {
      datepicker.clickOnNavigation('body', '>');
      datepicker.isDayIntervalDisabledInNextMonth(minDate, maxDate, false);
    }
  });

  it(`when user clicks on any other date, not from this interval, nothing happens`, () => {
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 8);
    const dateOutOfIntervalLeft = new Date();
    const dateOutOfIntervalRight = new Date();
    dateOutOfIntervalLeft.setDate((minDate.getDate() - 1));
    dateOutOfIntervalRight.setDate((minDate.getDate() + 1));
    datepicker.clickOnDatepickerInput(minMax);
    datepicker.isDatepickerOpened(true);
    if (dateOutOfIntervalLeft.getMonth() <= minDate.getMonth()) {
      datepicker.isDayIntervalDisabledInCurrentMonth(dateOutOfIntervalLeft, minDate, true);
    } else {
      datepicker.clickOnNavigation('body', '>');
      datepicker.isDayIntervalDisabledInNextMonth(maxDate, dateOutOfIntervalRight, true);
    }
  });

  it('when user clicks on date from this interval, it chosen and shown in input in format "mm/dd/yyyy"', () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    datepicker.clickOnDatepickerInput(minMax);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${minDate.getDate()}`);
    datepicker.isInputValueEqual(minMax, minDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }), 0);
  });

  it(`when user clicks on DateRange input, then container opened and user can chose date from min-max`, () => {
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() - 1);
    maxDate.setDate(maxDate.getDate() + 7);
    datepicker.clickOnDaterangepickerInput(minMax);
    datepicker.isDaterangepickerOpened(true);
    datepicker.isDayIntervalDisabledInCurrentMonthDateRange(minDate, maxDate, false);
    datepicker.isDayIntervalDisabledInNextMonthDateRange(minDate, maxDate, false);
  });

  it(`clicks on any other date in daterangepicker, not from this interval, nothing happens`, () => {
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setDate(minDate.getDate() - 2);
    maxDate.setDate(maxDate.getDate() + 8);
    const dateOutOfIntervalLeft = new Date(minDate.getTime());
    const dateOutOfIntervalRight = new Date(maxDate.getTime());
    dateOutOfIntervalLeft.setDate((dateOutOfIntervalLeft.getDate() - 5));
    dateOutOfIntervalRight.setDate((dateOutOfIntervalRight.getDate() + 5));
    datepicker.clickOnDaterangepickerInput(minMax);
    datepicker.isDaterangepickerOpened(true);
    if (minDate.getMonth() === dateOutOfIntervalLeft.getMonth()) {
      datepicker.isDayIntervalDisabledInCurrentMonthDateRange(dateOutOfIntervalLeft, minDate, true);
    } else {
      datepicker.isDayIntervalDisabledInNextMonthDateRange(maxDate, dateOutOfIntervalRight, true);
    }
  });

  it('when user clicks on the first, second date from this interval, then it shown in input "mm/dd/yyyy"', () => {
    const dateLeft = new Date();
    const dateRight = new Date();
    dateLeft.setDate(dateLeft.getDate() - 1);
    datepicker.clickOnDaterangepickerInput(minMax);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, `${dateLeft.getDate()}`);
    if (dateLeft.getMonth() === dateRight.getMonth()) {
      datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, `${dateRight.getDate()}`);
    } else {
      datepicker.clickOnDaterangePickerTableItem('date', 1, 'body', undefined, `${dateRight.getDate()}`);
    }
    datepicker.isInputValueEqual(minMax,
      `${dateLeft.toLocaleDateString('en-US',
        { year: 'numeric', month: '2-digit', day: '2-digit' })
        } - ${dateRight.toLocaleDateString('en-US',
        { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 1);
  });
});
