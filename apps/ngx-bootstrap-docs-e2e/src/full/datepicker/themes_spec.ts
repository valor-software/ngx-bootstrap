import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Themes', () => {
  const datepicker = new DatepickerPo();
  const themes = datepicker.exampleDemosArr.themes;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Themes');
  });

  it(`example contains select field (with "green" by default), Datepicker input and button "Open"`, () => {
    datepicker.isInputHaveAttrs(themes, [{ attr: 'type', value: 'text' }]);
    datepicker.isButtonExist(themes, 'Open');
    datepicker.isSelectExist(themes, 'green');
  });

  it(`when user clicks on "Open" button, bs-datepicker theme-green opened with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.isDatepickerStyleCorrect('green');
  });

  it(`when user chose "default", bs-datepicker theme-default shown with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.selectOne(themes, 'default');
    datepicker.isDatepickerStyleCorrect('default');
  });

  it(`when user chose "blue", bs-datepicker theme-blue shown with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.selectOne(themes, 'blue');
    datepicker.isDatepickerStyleCorrect('blue');
  });

  it(`when user chose "dark-blue", bs-datepicker theme-dark-blue shown with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.selectOne(themes, 'dark-blue');
    datepicker.isDatepickerStyleCorrect('dark-blue');
  });

  it(`when user chose "red", bs-datepicker theme-red shown with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.selectOne(themes, 'red');
    datepicker.isDatepickerStyleCorrect('red');
  });

  it(`when user chose "orange", bs-datepicker theme-red shown with appropriate styles`, () => {
    datepicker.clickOnBtn(themes);
    datepicker.isDatepickerOpened(true);
    datepicker.selectOne(themes, 'orange');
    datepicker.isDatepickerStyleCorrect('orange');
  });
});
