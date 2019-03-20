import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Custom validation', () => {
  beforeEach(() => timepicker.navigateTo());
  const timepicker = new TimepickerPo();
  const customValidation = timepicker.exampleDemosArr.customValidation;
  const newDate = new Date();
  const expectedDate: any = () => {
    const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const getDay = newDate.getDay();
    const getMonth = newDate.getMonth();
    const date = newDate.getDate();
    const year = newDate.getFullYear();

    return `${weekDay[getDay]} ${month[getMonth]} ${date} ${year}`;
  };

  it(`timepicker component with hour, minute inputs, clickable button "AM" and
   success alert. timepicker inputs have placeholders "HH and "MM`, () => {
    const hourPlaceholder = 'HH';
    const minutesPlaceholder = 'MM';
    const btnShowMeridian = 'AM ';
    timepicker.scrollToMenu('Custom validation');
    timepicker.isTimepickerVisible(customValidation);
    timepicker.isButtonExist(customValidation, btnShowMeridian, 0);
    timepicker.isInputPlaceholderContains(customValidation, hourPlaceholder);
    timepicker.isInputPlaceholderContains(customValidation, minutesPlaceholder, 1);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.greenAlertSelector, 'Time is: ');
  });

  it(`when user sets any time between 11:00 and 12:59 then success alert with current date and appropriate
  time is shown`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '11');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.greenAlertSelector,
      `${expectedDate(new Date())} ${'11:59'}`);
  });

  it(`when user sets any time outside of interval 11:00 - 12:59, then 2 danger alerts shown:
  1st with "Time is:" with appropriate time and the 2nd "Invalid time"`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '10');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.redAlertSelector,
      `${'Time is:'} ${expectedDate(new Date())} ${'10:59'}`);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.redAlertSelector, 'Invalid time', 1);
  });

  it(`when user sets a valid time and clicks on the "PM/AM" button then alert changed from green to red
   and the 2nd alert with "Invalid time is shown`, () => {
    timepicker.clearInputAndSendKeys(customValidation, '11');
    timepicker.clearInputAndSendKeys(customValidation, '59', 1);
    timepicker.triggerEventOnInput(customValidation, 'change', 1);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.greenAlertSelector, expectedDate(new Date()));
    timepicker.clickOnBtn(customValidation, 0);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.redAlertSelector,
      `${'Time is:'} ${expectedDate(new Date())} ${'23:59'}`);
    timepicker.isAdditionalAlertContains(customValidation, timepicker.redAlertSelector, 'Invalid time', 1);
  });
});
