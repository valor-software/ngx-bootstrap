import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Custom validation with isValid event', () => {
  const timepicker = new TimepickerPo();
  const customEvent = timepicker.exampleDemosArr.isValidEvent;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker component and clickable button "AM"("PM") (according to the current time),
    user see clickable button "Enable / Disable input"`, () => {
    const newDate = new Date();
    timepicker.scrollToMenu('Custom validation with isValid event');
    timepicker.isTimepickerVisible(customEvent);
    timepicker.isAlertContains(customEvent, `Time is: ${newDate.toString().split(':')[0]}`, 0, 'success');
    timepicker.isInputValueContain(customEvent, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(customEvent, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(customEvent, (newDate.getHours() >= 12) ? 'PM ' : 'AM ');
  });

  it(`when user sends any invalid time or string in hours input then 2 danger alerts shown
  the 1st with "Time is:" info" and the 2nd with "Invalid time"`, () => {
    timepicker.clearInputAndSendKeys(customEvent, '99');
    timepicker.clearInputAndSendKeys(customEvent, '05', 1);
    timepicker.triggerEventOnInput(customEvent, 'change', 1);
    timepicker.isAlertContains(customEvent, 'Time is: ', 0, 'danger');
    timepicker.isAlertContains(customEvent, 'Invalid time', 1, 'danger');
  });

  it(`when user sends any invalid time or string in minutes input then 2 danger alerts shown
  the 1st with "Time is:" info" and the 2nd with "Invalid time"`, () => {
    timepicker.clearInputAndSendKeys(customEvent, '5');
    timepicker.clearInputAndSendKeys(customEvent, '99', 1);
    timepicker.triggerEventOnInput(customEvent, 'change', 1);
    timepicker.isAlertContains(customEvent, 'Time is: ', 0, 'danger');
    timepicker.isAlertContains(customEvent, 'Invalid time', 1, 'danger');
  });

  it(`when user clicks on any arrow then date become valid (taken the nearest date from now)`, () => {
    timepicker.clearInputAndSendKeys(customEvent, 'ab');
    timepicker.clearInputAndSendKeys(customEvent, 'cd', 1);
    timepicker.isAlertContains(customEvent, 'Invalid time', 1, 'danger');
    timepicker.pressKeyOnInput(customEvent, 'up', 1);
    timepicker.isAlertContains(customEvent, `Time is:`, 0, 'success');
    timepicker.isComponentSrcContain('Custom validation with isValid event', 'isValid');
  });
});
