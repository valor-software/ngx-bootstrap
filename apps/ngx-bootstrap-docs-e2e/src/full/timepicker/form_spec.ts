import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Form', () => {
  const timepicker = new TimepickerPo();
  const form = timepicker.exampleDemosArr.form;

  beforeEach(() => {
    timepicker.navigateTo();
    timepicker.scrollToMenu('Form');
  });

  it(`example contains timepicker component and info alert with selected date and time (current by default)
    see current hour and minute in timepicker inputs, contains buttons "Enable Control" and "Disable Control".
    the timepicker is enabled by default`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(form);
    timepicker.isAlertContains(form, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(form, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(form, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(form, 'Enable Control', 1);
    timepicker.isButtonExist(form, 'Disable Control', 2);
    timepicker.isInputDisabled(form, 0, false);
    timepicker.isInputDisabled(form, 1, false);
  });

  it(`when user clicks on "Disable Control" button then the timepicker is disabled`, () => {
    timepicker.clickByText('button', 'Disable Control');
    timepicker.isArrowDisabled(form, 'up', 0);
    timepicker.isArrowDisabled(form, 'up', 1);
    timepicker.isArrowDisabled(form, 'down', 0);
    timepicker.isArrowDisabled(form, 'down', 1);
    timepicker.isInputDisabled(form, 0, true);
    timepicker.isInputDisabled(form, 1, true);
    timepicker.isButtonDisabled(form, 0);
  });

  it(`when user clicks on "Enable Control" then timepicker is active again, buttons become clickable,
    after click on arrow up above the hour, minute input, then hours increased at 1 and minutes increased at 5`, () => {
    const hourToSet = 9;
    const minToSet = 47;
    timepicker.setTimeInInputs(form, hourToSet, minToSet);
    timepicker.clickOnBtn(form, 1);
    timepicker.clickOnBtn(form, 1);
    timepicker.isButtonDisabled(form, 0, false);
    timepicker.isInputDisabled(form, 0, false);
    timepicker.isInputDisabled(form, 1, false);
    timepicker.clickOnArrow(form, 'up', 0);
    timepicker.isInputValueContain(form, `${hourToSet + 1}`, 0);
    timepicker.clickOnArrow(form, 'up', 1);
    timepicker.isInputValueContain(form, `${minToSet + 5}`, 1);
  });
});
