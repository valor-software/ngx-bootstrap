import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Arrow Keys', () => {
  const timepicker = new TimepickerPo();
  const arrowKeys = timepicker.exampleDemosArr.arrowKeys;
  const btnEnableDisable = 'Enable / Disable keyboard arrow keys';

  beforeEach(() => {
    timepicker.navigateTo();
    timepicker.scrollToMenu('Arrow keys');
  });

  it(`example contains timepicker component and info alert with selected date and time (current by default)
    see current hour and minute in timepicker inputs, contains buttons "Enable / Disable keyboard arrow keys".
    the buttons are enabled by default`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(arrowKeys);
    timepicker.isAlertContains(arrowKeys,  `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(arrowKeys, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(arrowKeys, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(arrowKeys, btnEnableDisable, 1);
  });

  it(`when user activates hours input and click keyboard arrow up key,
  then time number increases with appropriate changes in info alert`, () => {
    const newDate = new Date();
    const expectedHour12Format =
      timepicker.getHoursIn12Format(newDate) === 1 ? '12' : timepicker.getHoursIn12Format(newDate) - 1;
    const expectedHour24Format = newDate.getHours() === 1 ? '12' : newDate.getHours() - 1;
    const currentMinutes = newDate.getMinutes();
    const expectedMinute = currentMinutes < 55 ? currentMinutes : -(currentMinutes - 60);
    timepicker.pressKeyOnInput(arrowKeys, 'down', 0);
    timepicker.isInputValueContain(arrowKeys, `${expectedHour12Format}`, 0);
    timepicker.isAlertContains(arrowKeys, `${expectedHour24Format}`);
    timepicker.pressKeyOnInput(arrowKeys, 'up', 1);
    timepicker.isInputValueContain(arrowKeys, `${expectedMinute + 5}`, 1);
    timepicker.isAlertContains(arrowKeys,  `${expectedMinute + 5}`);
  });

  it(`when user clicks on the "Enable / Disable keyboard arrow keys" button then keyboard arrows are disabled`, () => {
    const newDate = new Date();
    const expectedHour12Format = timepicker.getHoursIn12Format(newDate) === 1 ? '12' : timepicker.getHoursIn12Format(newDate) - 1;
    const expectedHour24Format = newDate.getHours() === 1 ? '12' : newDate.getHours();
    const currentMinutes = newDate.getMinutes();
    const expectedMinute = currentMinutes < 55 ? currentMinutes : - (currentMinutes - 60);
    timepicker.clickByText(arrowKeys, btnEnableDisable);
    timepicker.pressKeyOnInput(arrowKeys, 'down', 0);
    timepicker.isInputValueContain(arrowKeys, `${expectedHour12Format}`, 0);
    timepicker.isAlertContains(arrowKeys,  `${expectedHour24Format}`);
    timepicker.pressKeyOnInput(arrowKeys, 'up', 1);
    timepicker.isInputValueContain(arrowKeys, `${expectedMinute}`, 1);
    timepicker.isAlertContains(arrowKeys,  `${expectedMinute}`);
  });
});
