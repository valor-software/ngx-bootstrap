import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Initial state', () => {
  const datepicker = new DatepickerPo();
  const initialState = datepicker.exampleDemosArr.initialState;
  const newDate = new Date();
  const currentMonthNum: number = newDate.getMonth();
  const currentYearNum: number = newDate.getFullYear();
  const currentYearStr: string = currentYearNum.toString();
  const currentDay: number = newDate.getDate();
  const daySevenAfterCurrent = new Date();
  daySevenAfterCurrent.setDate(newDate.getDate() + 7);

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Initial state');
  });

  it(`example contains 2 inputs, 2 buttons Datepicker and Daterangepicker, value in Datepicker input is current day,
                     value in Daterangepicker input is interval from current day to current + 7 days`, () => {
    datepicker.isInputHaveAttrs(initialState, [{ attr: 'type', value: 'text' }], 0);
    datepicker.isButtonExist(initialState, 'Date Picker', 0);
    datepicker.isButtonExist(initialState, 'Date Range Picker', 1);
    datepicker.isInputValueEqual(initialState, `${
      newDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 0);
    datepicker.isInputValueEqual(initialState, `${
      newDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
      } - ${
      daySevenAfterCurrent.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 1);
  });

  it('when user clicks on "Date Picker" button, bs-datepicker-container opened and current date selected', () => {
    datepicker.clickOnBtn(initialState, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', `${currentDay}`);
  });

  it('when user clicks on other date, that date selected and shown in input', () => {
    const dayToChose = currentDay === 15 ? '16' : '15';
    const monthToChose = currentMonthNum + 1 < 10 ? `0${currentMonthNum + 1}` : currentMonthNum + 1;
    datepicker.clickOnBtn(initialState, 0);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, dayToChose);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(initialState, `${monthToChose}/${dayToChose}/${currentYearStr}`, 0);
    datepicker.clickOnBtn(initialState, 0);
    datepicker.isSelectedDateExist('datepicker', true, 'body', `${dayToChose}`);
  });

  it('when user clicks on "Date Range Picker", bs-daterangepicker-container opened with interval selected', () => {
    datepicker.clickOnBtn(initialState, 1);
    datepicker.isDaterangepickerOpened(true);
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', `${currentDay}`);
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', `${daySevenAfterCurrent.getDate()}`);
  });

  it('when user chose another interval, that interval selected and shown in input', () => {
    const dayToChose = currentDay === 15 ? '16' : '15';
    const nextDayToChose = `${Number(dayToChose) + 1}`;
    const monthToChose = currentMonthNum + 1 < 10 ? `0${currentMonthNum + 1}` : currentMonthNum + 1;
    datepicker.clickOnBtn(initialState, 1);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, dayToChose);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, nextDayToChose);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(initialState,
      `${monthToChose}/${dayToChose}/${currentYearStr} - ${
        monthToChose}/${nextDayToChose}/${currentYearStr}`, 1);
    datepicker.clickOnBtn(initialState, 1);
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', dayToChose);
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', nextDayToChose);
  });
});
