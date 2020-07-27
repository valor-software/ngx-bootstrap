import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo test suite: Config method', () => {
  const datepicker = new DatepickerPo();
  const configMethod = datepicker.exampleDemosArr.configMethod;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Config method');
  });

  it(`example contains Datepicker input and clickable button "Set min date"`, () => {
    datepicker.isInputHaveAttrs(configMethod, [{ attr: 'placeholder', value: 'Datepicker' }], 0);
    datepicker.isButtonExist(configMethod, 'Set min date', 0);
  });

  it(`when user clicks on Datepicker input, container opens, user able to click on any date,
                 when user clicks on 8 may 2018 - then this date appear in the input`, () => {
    datepicker.clearInputAndSendKeys(configMethod, '05/08/2018');
    datepicker.clickEnterOnInput(configMethod);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnDatepickerInput(configMethod);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', '8');
  });

  it(`when user clicks on "Set min date" button, then container opens,
                 when user try to click on any date before 13 of June 2018, nothing happens`, () => {
    datepicker.clickOnDatepickerInput(configMethod);
    datepicker.clearInputAndSendKeys(configMethod, '05/08/2018');
    datepicker.clickEnterOnInput(configMethod);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnBtn(configMethod);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', false, 'body');
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '12');
    datepicker.isSelectedDateExist('datepicker', false, 'body');
  });

  it(`when user clicks on "Set min date" button, then container opens,
                 when user click on date after 13 of June 2018 - then this date chosen and appear in the input`, () => {
    datepicker.clickOnDatepickerInput(configMethod);
    datepicker.clearInputAndSendKeys(configMethod, '05/09/2018');
    datepicker.clickEnterOnInput(configMethod);
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnBtn(configMethod);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', false, 'body');
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '16');
    datepicker.isDatepickerOpened(false);
    datepicker.clickOnBtn(configMethod);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', '16');
  });
});
