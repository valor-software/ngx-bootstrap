import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Outside click', () => {
  const datepicker = new DatepickerPo();
  const outsideClick = datepicker.exampleDemosArr.outsideClick;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Outside click');
  });

  it(`example contains 2 Datepicker inputs`, () => {
   datepicker.isInputHaveAttrs(outsideClick, [{attr: 'placeholder', value: 'Datepicker'}], 0);
   datepicker.isInputHaveAttrs(outsideClick, [{attr: 'placeholder', value: 'Datepicker'}], 1);
  });

  it(`when user clicks on the 1st Datepicker input, bs-datepicker-container opens
                 when user clicks outside this Datepicker, then bs-datepicker-container disappeared`, () => {
   datepicker.clickOnDatepickerInput(outsideClick, 0);
   datepicker.isDatepickerOpened(true);
   datepicker.clickOutside(`${outsideClick} input`);
   datepicker.isDatepickerOpened(false);
  });

  it(`when user clicks on the 2d Datepicker input, bs-datepicker-container opens
                 when user clicks outside this Datepicker, then bs-datepicker-container stay open`, () => {
   datepicker.clickOnDatepickerInput(outsideClick, 1);
   datepicker.isDatepickerOpened(true);
   datepicker.clickOutside(`${outsideClick} input`);
   datepicker.isDatepickerOpened(true);
  });

  it(`when user clicks on the 2d Datepicker input and select any date,
                 then bs-datepicker-container disappeared and date is shown in format "mm/dd/yyyy"`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(outsideClick, 1);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(outsideClick, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 1);
  });
});
