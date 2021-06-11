import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Arrow Keys', () => {
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
    const hourToSet = 5;
    const minToSet = 30;
    timepicker.setTimeInInputs(arrowKeys, hourToSet, minToSet);
    timepicker.pressKeyOnInput(arrowKeys, 'down', 0);
    timepicker.isInputValueContain(arrowKeys, `${hourToSet - 1}`, 0);
    timepicker.isAlertContains(arrowKeys, `${timepicker.getHoursIn24Format(hourToSet - 1)}`);
    timepicker.pressKeyOnInput(arrowKeys, 'up', 1);
    timepicker.isInputValueContain(arrowKeys, `${minToSet + 5}`, 1);
    timepicker.isAlertContains(arrowKeys,  `${minToSet + 5}`);
  });

  it(`when user clicks on the "Enable / Disable keyboard arrow keys" button then keyboard arrows are disabled`, () => {
    const hourToSet = 5;
    const minToSet = 30;
    timepicker.setTimeInInputs(arrowKeys, hourToSet, minToSet);
    timepicker.clickByText(arrowKeys, btnEnableDisable);
    timepicker.pressKeyOnInput(arrowKeys, 'down', 0);
    timepicker.isInputValueContain(arrowKeys, `${hourToSet}`, 0);
    timepicker.isAlertContains(arrowKeys, `${timepicker.getHoursIn24Format(hourToSet)}`);
    timepicker.pressKeyOnInput(arrowKeys, 'up', 1);
    timepicker.isInputValueContain(arrowKeys, `${minToSet}`, 1);
    timepicker.isAlertContains(arrowKeys,  `${minToSet}`);
  });
});
