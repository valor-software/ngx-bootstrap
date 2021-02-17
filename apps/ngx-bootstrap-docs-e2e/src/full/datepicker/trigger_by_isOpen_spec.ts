import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Trigger by isOpen property', () => {
  const datepicker = new DatepickerPo();
  const triggerByIsOpen = datepicker.exampleDemosArr.triggerByIsOpen;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Trigger by isOpen property');
  });

  it(`example contains Datepicker input and clickable button "Toggle"`, () => {
   datepicker.isInputHaveAttrs(triggerByIsOpen, [{attr: 'placeholder', value: 'Datepicker'}]);
   datepicker.isBtnTxtEqual(triggerByIsOpen, 'Toggle');
  });

  it(`when user clicks on "Toggle", then bs-datepicker-container opens, when user select any date
                 from this Datepicker, then container disappeared and date is shown in format "mm/dd/yyyy"`, () => {
    const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnBtn(triggerByIsOpen);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.isInputValueEqual(triggerByIsOpen, `${chosenDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks on "Toggle" again (after chosing day), then bs-datepicker-container opens again
                 when user clicks on "Toggle" again, then bs-datepicker-container disappear`, () => {
    // const chosenDate = new Date(`${new Date().getMonth() + 1}/10/${new Date().getFullYear()}`);
    datepicker.clickOnBtn(triggerByIsOpen);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, '10');
    datepicker.clickOnBtn(triggerByIsOpen);
    datepicker.clickOnBtn(triggerByIsOpen);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', '10');
    datepicker.clickOnBtn(triggerByIsOpen);
    datepicker.isDatepickerOpened(false);
  });
});
