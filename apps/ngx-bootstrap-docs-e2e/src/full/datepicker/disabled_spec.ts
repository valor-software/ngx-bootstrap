import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Disabled', () => {
  const datepicker = new DatepickerPo();
  const disabled = datepicker.exampleDemosArr.disabled;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Disabled');
  });

  it(`example contains 2 inputs: Datepicker and Daterangepicker and button "Toggle disabling"`, () => {
    datepicker.isInputHaveAttrs(disabled, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isInputHaveAttrs(disabled, [{ attr: 'placeholder', value: 'Daterangepicker' }], 1);
    datepicker.isBtnTxtEqual(disabled, 'Toggle disabling');
  });

  it(`when user clicks on Datepicker input, then container opened
                 when user clicks on any date, then this date chosen and shown in format "mm/dd/yyyy"`, () => {
    datepicker.clickOnDatepickerInput(disabled, 0);
    datepicker.isDatepickerOpened(true);
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(disabled, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks on "Toggle disabling" and clicks on Datepicker input, then user unable to chose any date
                 when user clicks on any date, month or year - nothing happens`, () => {
    datepicker.clickOnBtn(disabled);
    datepicker.clickOnDatepickerInput(disabled, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(disabled, ``);
    datepicker.isDatepickerOpened(true);
  });

  it(`when user clicks on "Toggle disabling" again, clicks on Datepicker, user able to chose date
                 when user clicks on any date, it chosen and shown in the input field in format "mm/dd/yyyy"`, () => {
    datepicker.dblClickOnBtn(disabled);
    datepicker.clickOnDatepickerInput(disabled, 0);
    datepicker.isDatepickerOpened(true);
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(disabled, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks on Daterangepicker input, then container opened and user can chose any date
                 when user chose any interval, it chosen and shown in format "mm/dd/yyyy" - "mm/dd/yyyy"`, () => {
    datepicker.clickOnDaterangepickerInput(disabled);
    datepicker.isDaterangepickerOpened(true);
    const dateLeft = new Date(`${new Date().getMonth() + 1}/01/${new Date().getFullYear()}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateRight = new Date(`${new Date().getMonth() + 1}/15/${new Date().getFullYear()}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(disabled, `${dateLeft} - ${dateRight}`, 1);
  });

  it(`when user clicks on "Toggle disabling", clicks on Daterangepicker, then user unable to chose any date
                 when user clicks on any date, month or year - nothing happens`, () => {
    datepicker.clickOnBtn(disabled);
    datepicker.clickOnDaterangepickerInput(disabled);
    datepicker.isDaterangepickerOpened(true);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.isInputValueEqual(disabled, ``, 1);
    datepicker.isDaterangepickerOpened(true);
  });

  it(`when user clicks on "Toggle disabling" again, clicks on Daterangepicker, he able to chose another interval
                 when user chose any other interval, it chosen and shown in format "mm/dd/yyyy" - "mm/dd/yyyy"`, () => {
    datepicker.dblClickOnBtn(disabled);
    datepicker.clickOnDaterangepickerInput(disabled);
    datepicker.isDaterangepickerOpened(true);
    const dateLeft = new Date(`${new Date().getMonth() + 1}/01/${new Date().getFullYear()}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const dateRight = new Date(`${new Date().getMonth() + 1}/15/${new Date().getFullYear()}`)
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.isSelectedDateExist('daterangepicker', true, 'body', '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(disabled, `${dateLeft} - ${dateRight}`, 1);
  });
});
