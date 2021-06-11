import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Custom today class', () => {
  const datepicker = new DatepickerPo();
  const customToday = datepicker.exampleDemosArr.customTodayClass;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Custom today class');
  });

  it(`example contains 1 input for Datepicker`, () => {
    datepicker.isInputHaveAttrs(customToday, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
  });

  it(`when user clicks on the DatePicker input then container opened and no one date selected by default
                 current today date have specific class name "custom-today-class"`, () => {
    datepicker.clickOnDatepickerInput(customToday);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', false, 'body');
    datepicker.isTodayHaveClass('custom-today-class');
  });

  it(`when user chose any date, then this date chosen and shown in the input`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(customToday);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(customToday, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks on input again, then 1t date selected and current with custom-today-class
                 when user chose today and click on input again, then current selected with custom-today-class`, () => {
    // const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(customToday);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.clickOnDatepickerInput(customToday);
    datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${new Date().getDate()}`);
    datepicker.clickOnDatepickerInput(customToday);
    datepicker.isSelectedDateExist('datepicker', true, 'body', `${new Date().getDate()}`);
    datepicker.isTodayHaveClass('custom-today-class');
  });
});
