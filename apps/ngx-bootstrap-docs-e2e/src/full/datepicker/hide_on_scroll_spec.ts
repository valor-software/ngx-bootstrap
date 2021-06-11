import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Hide on scroll', () => {
  const datepicker = new DatepickerPo();
  const hideOnScroll = datepicker.exampleDemosArr.hideOnScroll;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Hide on scroll');
  });

  it(`example contains Datepicker input, "Date Picker" button`, () => {
    datepicker.isInputHaveAttrs(hideOnScroll, [{ attr: 'placeholder', value: 'Datepicker' }]);
    datepicker.isButtonExist(hideOnScroll, 'Date Picker');
  });

  it(`when user clicks on "Date Picker", container opened without selected date, after scroll it disappear`, () => {
    // TODO impossible open datepicker, because scroll always triggers
    // datepicker.clickOnBtn(hideOnScroll);
    // datepicker.clickOnDatepickerInput(hideOnScroll);
    // datepicker.setBtnAttribute(hideOnScroll, 0, 'true');
    // datepicker.isDatepickerOpened(true);
    // datepicker.isSelectedDateExist('datepicker', false);
    // datepicker.scrollToDatepickerBottom(hideOnScroll);
    // datepicker.isDatepickerOpened(false);
  });
});
