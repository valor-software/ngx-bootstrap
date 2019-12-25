import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo test suite: Quick-select-ranges', () => {
  const datepicker = new DatepickerPo();
  const quickSelectRange = datepicker.exampleDemosArr.quickSelectRange;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Quick select ranges');
  });

  it(`example contains 1 input of Daterangepicker`, () => {
    datepicker.isInputValueEqual(quickSelectRange, '');
  });

  it(`when user clicks on Daterangepicker input, then container opened and user see list of quick ranges to select`, () => {
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isDaterangepickerOpened(true);
    datepicker.isDaterangePickerBodyExistAndCorrect('date');
    datepicker.isQuickSelectRangesDisplayed();
  });

  it('when user clicks on a range from quick select list, that range is applied to datepicker', () => {
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isDaterangepickerOpened(true);
    datepicker.isQuickSelectRangeApplied(0, '12/18/2019 - 12/25/2019', quickSelectRange);
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isQuickSelectRangeApplied(1, '12/25/2019 - 01/01/2020', quickSelectRange);

  })

  it('when user clicks on a range from quick select, then that button should be selected/highlighted', () => {
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isQuickSelectRangeApplied(0, '12/18/2019 - 12/25/2019', quickSelectRange);
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isQuickSelectRangeButtonHighlighted(0);
  });

  it('when no date value is selected, then custom range button should be active', () => {
    datepicker.clickOnDaterangepickerInput(quickSelectRange);
    datepicker.isQuickSelectRangeButtonHighlighted(2);
  });
});
