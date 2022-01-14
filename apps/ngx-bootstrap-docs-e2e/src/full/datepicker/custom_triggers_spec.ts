import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Custom triggers', () => {
  const datepicker = new DatepickerPo();
  const customTriggers = datepicker.exampleDemosArr.customTriggers;
  const currentMonthNum: number = new Date().getMonth();
  const currentYear: number = new Date().getFullYear();


  beforeEach(() => {
    cy.viewport(1440, 900);
    datepicker.navigateTo();
    datepicker.clickOnDemoMenu('Custom triggers');
  });

  it(`example contains 1 Datepicker input and 2 DateRangepicker inputs`, () => {
   datepicker.isInputHaveAttrs(customTriggers, [{attr: 'placeholder', value: 'Datepicker'}], 0);
   datepicker.isInputHaveAttrs(customTriggers, [{attr: 'placeholder', value: 'Daterangepicker'}], 1);
   datepicker.isInputHaveAttrs(customTriggers, [{attr: 'placeholder', value: 'Daterangepicker'}], 2);
  });

  it(`when user move mouse to the first Datepicker input, then datepicker opens,
                 when user chose any date, then it appear in the first input field in format "mm/dd/yyyy"`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.mouseMove(`${customTriggers} input`, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(customTriggers, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 0);
  });

  it(`when user click in the first DateRangepicker input, it's activated , daterangepicker not shown
                 when user press any key, then daterangepicker-container shown and user can chose any interval`, () => {
    datepicker.clickOnDaterangepickerInput(customTriggers, 0);
    datepicker.isDaterangepickerOpened(false);
    datepicker.clickEnterOnInput(customTriggers, 1);
    datepicker.isDaterangepickerOpened(true);
    datepicker.isSelectedDateExist('daterangepicker', false, 'body');
  });

  it(`when user chose interval, then bs-daterangepicker-container disappeared
                 and this interval shown in appropriate input in format "mm/dd/yyyy" - "mm/dd/yyyy"`, () => {
    const dateLeft = new Date(`${currentMonthNum + 1}/01/${currentYear}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateRight = new Date(`${currentMonthNum + 1}/15/${currentYear}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    datepicker.clickOnDaterangepickerInput(customTriggers, 0);
    datepicker.clickEnterOnInput(customTriggers, 1);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(customTriggers, `${dateLeft} - ${dateRight}`, 1);
});

  it(`when user click in the second DateRangepicker input, it's activated and bs-daterangepicker not shown
                 when user press any key, then bs-daterangepicker-container still not shown`, () => {
    datepicker.clickOnDaterangepickerInput(customTriggers, 1);
    datepicker.isDaterangepickerOpened(false);
    datepicker.clickEnterOnInput(customTriggers, 2);
    datepicker.isDaterangepickerOpened(false);
  });

  it(`when user click twice on input, then bs-daterangepicker shown, when user chose interval, then
                 bs-daterangepicker disappeared and this interval shown in input "mm/dd/yyyy" - "mm/dd/yyyy"`, () => {
    const dateLeft = new Date(`${currentMonthNum + 1}/01/${currentYear}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateRight = new Date(`${currentMonthNum + 1}/15/${currentYear}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    datepicker.dblClickOnInput(customTriggers, 2);
    datepicker.isDaterangepickerOpened(true);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(customTriggers, `${dateLeft} - ${dateRight}`, 2);
  });
});
