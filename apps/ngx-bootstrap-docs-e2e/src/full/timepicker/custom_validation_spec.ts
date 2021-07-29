import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Custom validation', () => {
  const timepicker = new TimepickerPo();
  const customValidation = timepicker.exampleDemosArr.customValidation;

  beforeEach(() => {
    timepicker.navigateTo();
    timepicker.scrollToMenu('Custom validation');
  });

  it(`example contains timepicker component with hour, minute inputs, clickable button "AM", success alert,
   timepicker inputs have placeholders "HH and "MM`, () => {
    timepicker.isTimepickerVisible(customValidation);
    timepicker.isButtonExist(customValidation, 'AM ', 0);
    timepicker.isInputPlaceholderContains(customValidation, 'HH');
    timepicker.isInputPlaceholderContains(customValidation, 'MM', 1);
    timepicker.isAlertContains(customValidation, 'Time is: ', 0, 'success');
  });

  it(`when user sets any time between 11:00 and 12:59
  then success alert with current date and appropriate time is shown`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '11');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAlertContains(customValidation, '11:59', 0, 'success');
  });

  it(`when user sets any time outside of interval 11:00 - 12:59, then 2 danger alerts shown:
  1st with "Time is:" with appropriate time and the 2nd "Invalid time"`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '10');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAlertContains(customValidation, '10:59', 0, 'danger');
    timepicker.isAlertContains(customValidation, 'Invalid time', 1, 'danger');
  });

  it(`when user sets a valid time and clicks on the "PM/AM" button then alert changed from green to red
   and the 2nd alert with "Invalid time is shown`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '11');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAlertContains(customValidation, '11:59', 0, 'success');
    timepicker.clickOnBtn(customValidation, 0);
    timepicker.isAlertContains(customValidation, '23:59', 0, 'danger');
    timepicker.isAlertContains(customValidation, 'Invalid time', 1, 'danger');
  });
});
