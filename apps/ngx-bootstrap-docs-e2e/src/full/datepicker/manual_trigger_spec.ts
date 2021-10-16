import { DatepickerPo } from '../../support/datepicker.po';

describe('Datepicker demo testing suite: Manual triggering', () => {
  const datepicker = new DatepickerPo();
  const manualTrigger = datepicker.exampleDemosArr.manualTrigger;

  beforeEach(() => {
    datepicker.navigateTo();
    datepicker.scrollToMenu('Manual triggering');
  });

  it(`example contains Datepicker input and 3 clickable buttons: "Open", "Close", "Toggle"`, () => {
    datepicker.isInputHaveAttrs(manualTrigger, [{ attr: 'type', value: 'text' }], 0);
    datepicker.isBtnTxtEqual(manualTrigger, 'Open', 0);
    datepicker.isBtnTxtEqual(manualTrigger, 'Close', 1);
    datepicker.isBtnTxtEqual(manualTrigger, 'Toggle', 2);
  });

  it(`when user clicks "Open", datepicker opened, when user chose any date, then container disappeared,
                 and date shown in the input in format "mm/dd/yyyy"`, () => {
    const newDate = new Date();
    datepicker.clickOnBtn(manualTrigger, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${newDate.getDate()}`);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(manualTrigger, `${newDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks "Open" again, datepicker opened and date is selected,
                 when user clicks "Close", then container disappeared and date shown in the input "mm/dd/yyyy"`, () => {
    const newDate = new Date();
    datepicker.clickOnBtn(manualTrigger, 0);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${newDate.getDate()}`);
    datepicker.clickOnBtn(manualTrigger, 0);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', `${newDate.getDate()}`);
    datepicker.clickOnBtn(manualTrigger, 1);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(manualTrigger, `${newDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });

  it(`when user clicks "Toggle", then datepicker opened and date is selected
                 when user clicks "Toggle" again, container disappeared, date shown in the input "mm/dd/yyyy"`, () => {
    const newDate = new Date();
    datepicker.clickOnBtn(manualTrigger, 0);
    datepicker.clickOnDatepickerTableItem('date', 'body', undefined, `${newDate.getDate()}`);
    datepicker.clickOnBtn(manualTrigger, 2);
    datepicker.isDatepickerOpened(true);
    datepicker.isSelectedDateExist('datepicker', true, 'body', `${newDate.getDate()}`);
    datepicker.clickOnBtn(manualTrigger, 2);
    datepicker.isDatepickerOpened(false);
    datepicker.isInputValueEqual(manualTrigger, `${newDate
      .toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}`);
  });
});
