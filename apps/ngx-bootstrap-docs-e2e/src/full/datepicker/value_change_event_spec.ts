import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Value change event', () => {
  const datepicker = new DatepickerPo();
  const valueChangeEvent = datepicker.exampleDemosArr.valueChangeEvent;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Value change event');
  });

  it(`example contains Datepicker input`, () => {
    datepicker.isInputHaveAttrs(valueChangeEvent, [{ attr: 'placeholder', value: 'Datepicker' }]);
  });

  it(`when user clicks on Datepicker input, container opens, when chose any date - date is shown
                 in the input in format "mm/dd/yyyy", card with info "Changed date is Mmm dd, yyyy" shown`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/15/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(valueChangeEvent);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '15');
    datepicker.isInputValueEqual(valueChangeEvent, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.isPreviewExist(valueChangeEvent, `Changed date is ${chosenDate
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`);
  });

  it(`when user clicks on Datepicker input again and chose another Date, then this new date is shown
                 in the input in format "mm/dd/yyyy" and card with info "Changed date is Mmm dd, yyyy" shown`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/15/${new Date().getFullYear()}`);
    const chosenOtherDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(valueChangeEvent);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '15');
    datepicker.isInputValueEqual(valueChangeEvent, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.clickOnDatepickerInput(valueChangeEvent);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(valueChangeEvent, `${chosenOtherDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.isPreviewExist(valueChangeEvent, `Changed date is ${chosenOtherDate
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`);
  });

  it(`when user clears input, then card with info disappeared`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/15/${new Date().getFullYear()}`);
    datepicker.clickOnDatepickerInput(valueChangeEvent);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '15');
    datepicker.isInputValueEqual(valueChangeEvent, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
    datepicker.clearInput(valueChangeEvent);
    datepicker.clickEnterOnInput(valueChangeEvent);
    datepicker.isPreviewHidden(valueChangeEvent);
  });
});
