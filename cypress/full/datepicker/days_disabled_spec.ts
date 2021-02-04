import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Days disabled', () => {
  const datepicker = new DatepickerPo();
  const daysDisabled = datepicker.exampleDemosArr.daysDisabled;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Days disabled');
  });

  it(`example contains 2 inputs of Datepicker`, () => {
    datepicker.isInputHaveAttrs(daysDisabled, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isInputHaveAttrs(daysDisabled, [{ attr: 'placeholder', value: 'Datepicker' }], 1);
  });

  it(`when user clicks on 1 Datepicker, then it opened, user can chose date except Saturday and Sunday
                   when user clicks on any Saturday or Sunday, nothing happens, they are disabled`, () => {
    datepicker.clickOnDatepickerInput(daysDisabled, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.isWeekdayDisabled(true, 0);
    datepicker.isWeekdayDisabled(true, 6);
    datepicker.clickOnWeekDay(false);
    datepicker.isDatepickerOpened(true);
    datepicker.isInputValueEqual(daysDisabled, '', 0);
  });

  it(`when user clicks on any active date in 1 datepicker, this date chosen and shown "mm/dd/yyyy"`, () => {
    datepicker.clickOnDatepickerInput(daysDisabled, 0);
    datepicker.clickOnWeekDay(true);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueContain(daysDisabled, `${new Date().getMonth() + 1}`, 0);
    datepicker.isInputValueContain(daysDisabled, `${new Date().getFullYear()}`, 0);
  });

  it(`when user clicks on the second Datepicker, then container opened and user can chose any date`, () => {
    const monthToChose = new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1;
    datepicker.clickOnDatepickerInput(daysDisabled, 1);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(daysDisabled, `${monthToChose}/10/${new Date().getFullYear()}`, 1);
  });

  it(`when user clicks on any Saturday or Sunday, this date chosen and shown in the input "mm/dd/yyyy"`, () => {
    datepicker.clickOnDatepickerInput(daysDisabled, 1);
    datepicker.clickOnWeekDay(false);
    datepicker.isInputValueContain(daysDisabled, `${new Date().getMonth() + 1}`, 1);
    datepicker.isInputValueContain(daysDisabled, `${new Date().getFullYear()}`, 1);
  });
});
