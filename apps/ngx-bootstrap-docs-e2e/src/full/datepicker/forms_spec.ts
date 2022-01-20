import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Forms', () => {
  const datepicker = new DatepickerPo();
  const forms = datepicker.exampleDemosArr.forms;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Forms');
  });

  it(`example contains 2 inputs: Datepicker and Daterangepicker and preview block, empty by default`, () => {
    datepicker.isInputHaveAttrs(forms, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isInputHaveAttrs(forms, [{ attr: 'placeholder', value: 'Daterangepicker' }], 1);
    datepicker.isCodePreviewExist(forms, '', true, 0);
  });

  it(`when user chose any date from Datepicker, then in preview block date is shown in default JS format`, () => {
    const newDate = new Date();
    datepicker.clickOnDatepickerInput(forms);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${newDate.getDate()}`);
    datepicker.isInputValueEqual(forms, `${newDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.isCodePreviewExist(forms, `${newDate.toDateString()}`, true, 0);
  });

  it(`when user chose any interval from Daterangepicker, then interval shown in default JS format in preview`, () => {
    const newDate = new Date();
    const dateLeft = new Date(`${newDate.getMonth() + 1}/01/${newDate.getFullYear()}`);
    const dateRight = new Date(`${newDate.getMonth() + 1}/15/${newDate.getFullYear()}`);
    datepicker.clickOnDaterangepickerInput(forms);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(forms, `${dateLeft
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} - ${dateRight
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 1);
    datepicker.isCodePreviewExist(forms, `${dateLeft.toDateString()}`, true, 0);
    datepicker.isCodePreviewExist(forms, `${dateRight.toDateString()}`, true, 0);
  });
});
