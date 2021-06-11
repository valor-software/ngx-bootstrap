import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Dynamic', () => {
  const timepicker = new TimepickerPo();
  const dynamic = timepicker.exampleDemosArr.dynamic;
  const btnSet1400 = 'Set to 14:00';
  const btnClear = 'Clear';

  beforeEach(() => {
    timepicker.navigateTo();
    timepicker.scrollToMenu('Dynamic');
  });

  it(`example contains timepicker component and info alert with selected date and time (current by default)
    see current hour and minute in timepicker inputs, contains buttons "Enable / Disable keyboard arrow keys".
    Buttons are enabled by default`, () => {
    const newDate = new Date();
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
    timepicker.clickByText(dynamic, btnSet1400);
    timepicker.isInputValueEqual(dynamic, '02', 0);
    timepicker.isInputValueEqual(dynamic, '00', 1);
    timepicker.isBtnTxtEqual(dynamic, 'PM ');
    timepicker.isAlertContains(dynamic, '14:00');
  });

  it(`when user clicks on the "Clear" button then inputs are cleared and hour input show placeholder "HH",
  minute input show placeholder "MM" and button show "AM". user see info alert with "Time is: " and danger
  alert with "Invalid time format"`, () => {
    timepicker.clickByText(dynamic, btnClear);
    timepicker.isInputPlaceholderContains(dynamic, 'HH');
    timepicker.isInputPlaceholderContains(dynamic, 'MM', 1);
    timepicker.isBtnTxtEqual(dynamic, 'AM ');
    timepicker.isAlertContains(dynamic, 'Time is: ');
    timepicker.isAlertContains(dynamic, 'Invalid time format', 0, 'danger');
  });

  it(`when user clicks on the "Set to 14:00" button again then hour input show "02", minute input show "00"
   and button show "PM"`, () => {
    timepicker.clickByText(dynamic, btnSet1400);
    timepicker.isInputValueEqual(dynamic, '02', 0);
    timepicker.isInputValueEqual(dynamic, '00', 1);
    timepicker.isBtnTxtEqual(dynamic, 'PM ');
    timepicker.isAlertContains(dynamic, '14:00');
  });
});
