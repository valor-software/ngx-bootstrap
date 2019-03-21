import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Dynamic', () => {
  beforeEach(() => timepicker.navigateTo());

  const timepicker = new TimepickerPo();
  const dynamic = timepicker.exampleDemosArr.dynamic;
  const btnSet1400 = 'Set to 14:00';
  const btnClear = 'Clear';

  it(`example contains timepicker component and info alert with selected date and time (current by default)
    see current hour and minute in timepicker inputs, contains buttons "Enable / Disable keyboard arrow keys".
    the buttons are enabled by default`, () => {
    const newDate = new Date();
    timepicker.scrollToMenu('Dynamic');
    timepicker.isTimepickerVisible(dynamic);
    timepicker.isAlertContains(dynamic, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(dynamic, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(dynamic, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(dynamic, (newDate.getHours() >= 12) ? 'PM ' : 'AM ');
    timepicker.isButtonExist(dynamic, btnSet1400, 1);
    timepicker.isButtonExist(dynamic, btnClear, 2);
  });

  it(`when user clicks on "Set to 14:00" button then hour input show "02" and minute input show "00" and
  button shows "PM"`, () => {
    const expectedInputHour = '02';
    const expectedInputMinutes = '00';
    const expectedAlertTime = '14:00';
    const btnShowMeridian = 'PM ';
    timepicker.clickByText(dynamic, btnSet1400);
    timepicker.isInputValueEqual(dynamic, expectedInputHour, 0);
    timepicker.isInputValueEqual(dynamic, expectedInputMinutes, 1);
    timepicker.isBtnTxtEqual(dynamic, btnShowMeridian);
    timepicker.isAlertContains(dynamic, expectedAlertTime);
  });

  it(`when user clicks on the "Clear" button then inputs are cleared and hour input show placeholder "HH",
  minute input show placeholder "MM" and button show "AM". user see info alert with "Time is: " and danger
  alert with "Invalid time format"`, () => {
    const hourPlaceholder = 'HH';
    const minutesPlaceholder = 'MM';
    const btnShowMeridian = 'AM ';
    const alertMessage = 'Invalid time format';
    timepicker.clickByText(dynamic, btnClear);
    timepicker.isInputPlaceholderContains(dynamic, hourPlaceholder);
    timepicker.isInputPlaceholderContains(dynamic, minutesPlaceholder, 1);
    timepicker.isBtnTxtEqual(dynamic, btnShowMeridian);
    timepicker.isAlertContains(dynamic, 'Time is: ');
    timepicker.isAdditionalAlertContains(dynamic, timepicker.redAlertSelector, alertMessage);
  });

  it(`when user clicks on the "Set to 14:00" button again then hour input show "02", minute input show "00"
   and button show "PM"`, () => {
    const expectedInputHour = '02';
    const expectedInputMinutes = '00';
    const expectedAlertTime = '14:00';
    const btnShowMeridian = 'PM ';
    timepicker.clickByText(dynamic, btnSet1400);
    timepicker.isInputValueEqual(dynamic, expectedInputHour, 0);
    timepicker.isInputValueEqual(dynamic, expectedInputMinutes, 1);
    timepicker.isBtnTxtEqual(dynamic, btnShowMeridian);
    timepicker.isAlertContains(dynamic, expectedAlertTime);
  });
});
