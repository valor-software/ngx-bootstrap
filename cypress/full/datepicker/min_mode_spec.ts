import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo test suite: Min-mode', () => {
  const datepicker = new DatepickerPo();
  const minMode = datepicker.exampleDemosArr.minMode;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Min-mode');
  });

  it(`example contains 1 input of Datepicker and button "Date Picker"`, () => {
    datepicker.isInputValueEqual(minMode, '08/01/2020');
    datepicker.isBtnTxtEqual(minMode, 'Date Picker');
  });

  it(`when user clicks on Datepicker input, then container opened and user see list with months (mode=month)`, () => {
    datepicker.clickOnDatepickerInput(minMode);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatePickerBodyExistAndCorrect('month');
    datepicker.isDatepickerNavigationFullyActiveAndCorrect('month', 'body', '08', '2020');
  });

  it(`when user clicks on any month, then this month chosen and date shown in the input in format "mm/01/yyyy"`, () => {
    const monthIndexToChose = 10;
    datepicker.clickOnDatepickerInput(minMode);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatePickerBodyExistAndCorrect('month');
    datepicker.clickOnDatepickerTableItem('month', 'body', monthIndexToChose);
    datepicker.isInputValueEqual(minMode, `${monthIndexToChose + 1}/01/2020`);
  });

  it(`when user clicks on Datepicker btn, then container opened with mode=month
                 when user clicks on year in navigation, then table with years shown`, () => {
    datepicker.clickOnBtn(minMode);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatePickerBodyExistAndCorrect('month');
    datepicker.clickOnNavigation('body', 'month');
    datepicker.isDatePickerBodyExistAndCorrect('year');
  });

  it(`when user clicks on any year in year view, then this year chosen and user see months calendar
                 when user chose any month, then this month chosen and date shown in format "mm/01/yyyy"`, () => {
    const yearIndexToChose = 15;
    const monthIndexToChose = 11;
    datepicker.clickOnBtn(minMode);
    datepicker.clickOnNavigation('body', 'month');
    datepicker.isDatePickerBodyExistAndCorrect('year');
    datepicker.clickOnDatepickerTableItem('year', 'body', yearIndexToChose);
    datepicker.isDatePickerBodyExistAndCorrect('month');
    datepicker.isDatepickerNavigationFullyActiveAndCorrect('month', 'body', '01', `${Math.round(yearIndexToChose / 2 + 2020)}`);
    datepicker.clickOnDatepickerTableItem('month', 'body', monthIndexToChose);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(minMode, `${monthIndexToChose + 1}/01/2028`);
  });
});
