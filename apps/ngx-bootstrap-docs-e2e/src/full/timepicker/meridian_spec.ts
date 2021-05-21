import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Meridian', () => {
  const timepicker = new TimepickerPo();
  const meridian = timepicker.exampleDemosArr.meridian;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker and info alert with selected date and time (current by default),
    current hour and minute in timepicker inputs and button "AM"("PM"), button "12H / 24H"`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(meridian);
    timepicker.isAlertContains(meridian, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(meridian, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(meridian, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(meridian, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isButtonExist(meridian, `12H / 24H`, 1);
  });

  it(`when user clicks on "12H / 24H", then "AM"("PM") button disappeared and time changed (24-hours format)`, () => {
    const currentHours = new Date().getHours();
    const hourToSet = 10;
    const minToSet = 49;
    timepicker.setTimeInInputs(meridian, hourToSet, minToSet);
    timepicker.clickOnBtn(meridian, 1);
    timepicker.isButtonExist(meridian, `${(currentHours >= 12) ? 'PM' : 'AM'} `, 0, false);
    timepicker.isAlertContains(meridian, `${minToSet}`);
    timepicker.isAlertContains(meridian, `${timepicker.getHoursIn24Format(hourToSet)}`);
    timepicker.isInputValueContain(meridian, `${timepicker.getHoursIn24Format(hourToSet)}`, 0);
    timepicker.isInputValueContain(meridian, `${minToSet}`, 1);
  });

  it(`when user send other valid number to hours input (00-24), then time changed appropriate`, () => {
    const hourToSet = 18;
    timepicker.clickOnBtn(meridian, 1);
    timepicker.clearInputAndSendKeys(meridian, `${hourToSet}`, 0);
    timepicker.triggerEventOnInput(meridian, 'change');
    timepicker.isInputValueContain(meridian, `${hourToSet}`, 0);
    timepicker.isInputHaveInvalidStatus(meridian, false);
    timepicker.isAlertContains(meridian, `${hourToSet}`);
    timepicker.isInputValueContain(meridian, `${hourToSet}`, 0);
  });

  it(`when user send invalid data to both inputs, then the red border appeared, danger alert shown`, () => {
    const expectedHour = '78';
    const expectedMinute = '75';
    timepicker.clickOnBtn(meridian, 1);
    timepicker.clearInputAndSendKeys(meridian, expectedHour, 0);
    timepicker.triggerEventOnInput(meridian, 'change', 0);
    timepicker.isInputValueContain(meridian, expectedHour, 0);
    timepicker.isInputHaveInvalidStatus(meridian, true, 0);
    timepicker.clearInputAndSendKeys(meridian, expectedMinute, 1);
    timepicker.triggerEventOnInput(meridian, 'change', 1);
    timepicker.isInputValueContain(meridian, expectedMinute, 1);
    timepicker.isInputHaveInvalidStatus(meridian, true, 1);
    timepicker.isAlertContains(meridian, 'Time is: ');
  });

  it(`when user clicks on arrow up, then invalid value changed to correct, alert show appropriate time`, () => {
    const expectedHour = '78';
    const currentHours = new Date().getHours();
    const expectedHour24Format = currentHours === 1 ? '12' : currentHours + 1;
    timepicker.clickOnBtn(meridian, 1);
    timepicker.clearInputAndSendKeys(meridian, expectedHour);
    timepicker.triggerEventOnInput(meridian, 'change');
    timepicker.isInputHaveInvalidStatus(meridian, true);
    timepicker.clickOnArrow(meridian, 'up');
    timepicker.isInputHaveInvalidStatus(meridian, false);
    timepicker.isAlertContains(meridian, `${expectedHour24Format}`);
  });

  it(`when user clicks on arrow down, then invalid value changed to correct, alert show appropriate time`, () => {
    const expectedHour = '77';
    const currentHours = new Date().getHours();
    const expectedHour24Format = currentHours === 1 ? '12' : currentHours - 1;
    timepicker.clickOnBtn(meridian, 1);
    timepicker.clearInputAndSendKeys(meridian, expectedHour);
    timepicker.triggerEventOnInput(meridian, 'change');
    timepicker.isInputHaveInvalidStatus(meridian, true);
    timepicker.clickOnArrow(meridian, 'down');
    timepicker.isInputHaveInvalidStatus(meridian, false);
    timepicker.isAlertContains(meridian, `${expectedHour24Format}`);
  });

  it(`when user clicks on "12H / 24H" again, then "AM"("PM") button appeared in appropriate state,
    time in the input changed appropriate, alert did not change anyhow`, () => {
    const newDate = new Date();
    timepicker.clickByText(meridian, '12H / 24H');
    timepicker.clickByText(meridian, '12H / 24H');
    timepicker.isButtonExist(meridian, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0, true);
    timepicker.isInputValueContain(meridian, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(meridian, `${newDate.getMinutes()}`, 1);
    timepicker.isAlertContains(meridian, `Time is: ${newDate.toString().split(':')[0]}`);
  });
});
