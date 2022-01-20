import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Select week', () => {
  const datepicker = new DatepickerPo();
  const selectWeek = datepicker.exampleDemosArr.selectWeek;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Select week');
  });

  it(`example contains 4 inputs of Datepicker, each with appropriate placeholder`, () => {
   datepicker.isInputHaveAttrs(selectWeek, [{attr: 'placeholder', value: 'Datepicker with select week'}], 0);
   datepicker.isInputHaveAttrs(selectWeek, [{attr: 'placeholder', value: 'selectFromOtherMonth active'}], 1);
   datepicker.isInputHaveAttrs(selectWeek, [{attr: 'placeholder', value: 'Two first days disabled'}], 2);
   datepicker.isInputHaveAttrs(selectWeek, [{attr: 'placeholder', value: 'All days disabled'}], 3);
  });

  it(`when user clicks on the first datepicker input, then container opened and user can chose any week`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerWeekItem(1);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnDatepickerInput(selectWeek, 0);
    datepicker.isSelectedDateExist('datepicker', true);
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(false);
  });

  it(`when user select week, then datepicker container disappeared and date shown in input in format MM/DD/YYYY
                 when user clicks on this input again, then container opened and user see selected date`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 0);
    datepicker.clickOnDatepickerWeekItem(2);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(selectWeek, `${new Date().getMonth() + 1}`, 0);
    datepicker.isInputValueContain(selectWeek, `${new Date().getFullYear()}`, 0);
    datepicker.clickOnDatepickerInput(selectWeek, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true);
  });

  it(`when user clicks on the second input, then container opened and user can select weeks from other months`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerWeekItem(0);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.isSelectedDateExist('datepicker', true);
    datepicker.clickOnDatepickerWeekItem(5);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.isSelectedDateExist('datepicker', true);
  });

  it(`when user click on the week from previous month, then datepicker disappeared and date shown MM/DD/YYYY`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.clickOnNavigation('body', '<');
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 0 ? 12 : new Date().getMonth()}`, 1);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear()}`, 1);
  });

  it(`when user click on the week from previous month, then datepicker disappeared and date shown MM/DD/YYYY
                 when user click on the 2d datepicker again, then container opened and user see selected date`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.clickOnNavigation('body', '<');
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 0 ? 12 : new Date().getMonth()}`, 1);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear()}`, 1);
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.isSelectedDateExist('datepicker', true);
  });

  it(`when user chose the week from the next month, then datepicker container disappeared
                 and date shown in input in format MM/DD/YYYY`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 1);
    datepicker.clickOnNavigation('body', '>');
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 11 ? 1 : new Date().getMonth() + 2}`, 1);
    datepicker.isInputValueContain(selectWeek,
      `${new Date().getMonth() === 11 ? new Date().getFullYear() + 1 : new Date().getFullYear()}`, 1);
  });

  it(`when user click on the 3d datepicker input, then datepicker container opened
                 when user click on Sunday or Monday, nothing happens, they disabled`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 2);
    datepicker.isDatepickerOpened(true);
    datepicker.isWeekdayDisabled(true, 0);
    datepicker.isWeekdayDisabled(true, 1);
  });

  it(`when user click on the week from current month, then datepicker disappeared and date shown MM/DD/YYYY,
                 when user click on the 3d datepicker again, then container opened and user see selected date`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 2);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(selectWeek, `${new Date().getMonth() + 1}`, 2);
    datepicker.isInputValueContain(selectWeek, `${new Date().getFullYear()}`, 2);
    datepicker.clickOnDatepickerInput(selectWeek, 2);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true);
  });

  it(`when user click on the 4th datepicker input, then datepicker container opened
                 when user click on any item, nothing happens, they are disabled`, () => {
    datepicker.clickOnDatepickerInput(selectWeek, 3);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerWeekItem(3);
    datepicker.isDatepickerOpened(true);
    datepicker.isWeekdayDisabled(true, 0);
    datepicker.isWeekdayDisabled(true, 1);
    datepicker.isWeekdayDisabled(true, 2);
    datepicker.isWeekdayDisabled(true, 3);
    datepicker.isWeekdayDisabled(true, 4);
    datepicker.isWeekdayDisabled(true, 5);
    datepicker.isWeekdayDisabled(true, 6);
  });

  it(`when user enter the correct date to the input and press enter,
                 then after datepicker opens, this date selected`, () => {
    const dateToSend = '01/16/2019';
    datepicker.clearInputAndSendKeys(selectWeek, dateToSend, 3);
    datepicker.clickEnterOnInput(selectWeek, 3);
    datepicker.clickOnDatepickerInput(selectWeek, 3);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', '16');
  });
});
