import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Reactive forms', () => {
  const datepicker = new DatepickerPo();
  const reactiveForms = datepicker.exampleDemosArr.reactiveForms;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Reactive forms');
  });

  it(`example contains 2 inputs: Datepicker and Daterangepicker, by default, user don't see any preview blocks,
                 component src should be written with using FormGroup and FormBuilder`, () => {
    datepicker.isInputHaveAttrs(reactiveForms, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isInputHaveAttrs(reactiveForms, [{ attr: 'placeholder', value: 'Daterangepicker' }], 1);
    datepicker.isCodePreviewExist(reactiveForms, '', false, 0);
    datepicker.isComponentSrcContain('Reactive forms', 'FormGroup');
    datepicker.isComponentSrcContain('Reactive forms', 'FormBuilder');
  });

  it(`when user chose any date from Datepicker, then in preview block date value shown in ISO Dates format`, () => {
    const newDate = new Date();
    datepicker.clickOnDatepickerInput(reactiveForms);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${newDate.getDate()}`);
    datepicker.isInputValueEqual(reactiveForms, `${newDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.isCodePreviewExist(reactiveForms, `${newDate
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, true);
  });

  it(`when user chose any interval Daterangepicker, then in preview range value shown in ISO Dates`, () => {
    const newDate = new Date();
    const dateLeft = new Date(`${newDate.getMonth() + 1}/01/${newDate.getFullYear()}`);
    const dateRight = new Date(`${newDate.getMonth() + 1}/15/${newDate.getFullYear()}`);
    datepicker.clickOnDaterangepickerInput(reactiveForms);
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '1');
    datepicker.clickOnDaterangePickerTableItem('date', 0, 'body', undefined, '15');
    datepicker.isInputValueEqual(reactiveForms, `${dateLeft
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })} - ${dateRight
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`, 1);
    datepicker.isCodePreviewExist(reactiveForms, `${dateLeft
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, true);
    datepicker.isCodePreviewExist(reactiveForms, `${dateRight
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`, true);  });
});
