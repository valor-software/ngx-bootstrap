import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Min - Max', () => {
  const timepicker = new TimepickerPo();
  const minMax = timepicker.exampleDemosArr.minMax;
  const maxHours = 5;
  const minHours = 8;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker, info alert with selected date and time, current hour and minute,
    unclickable "PM"("AM"), src contains minTime.setHours(B).setMinutes(M), maxTime.setHours(A).setMinutes(N)`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(minMax);
    timepicker.isAlertContains(minMax, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(minMax, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(minMax, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(minMax, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
  });

  describe(`Hours`, () => {
    it(`when user clicks on arrow up, then input data and info alert changed appropriate`, () => {
      const minToSet = 35;
      if (new Date().getHours() <= 12) {
        const hourToSet = 10;
        timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
        timepicker.clickOnArrow(minMax, 'up', 0);
        timepicker.isInputValueContain(minMax, `${hourToSet + 1}`, 0);
        timepicker.isAlertContains(minMax, `${hourToSet + 1}`);
      } else {
        const hourToSet = 3;
        timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
        timepicker.clickOnArrow(minMax, 'up', 0);
        timepicker.isInputValueContain(minMax, `${hourToSet + 1}`, 0);
        timepicker.isAlertContains(minMax, `${timepicker.getHoursIn24Format(hourToSet + 1)}`);
      }
    });

    it(`when user clicks on arrow down, then input data and info alert changed appropriate`, () => {
      const minToSet = 35;
      if (new Date().getHours() <= 12) {
        const hourToSet = 11;
        timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
        timepicker.clickOnArrow(minMax, 'down', 0);
        timepicker.isInputValueContain(minMax, `${hourToSet - 1}`, 0);
        timepicker.isAlertContains(minMax, `${hourToSet - 1}`);
      } else {
        const hourToSet = 4;
        timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
        timepicker.clickOnArrow(minMax, 'down', 0);
        timepicker.isInputValueContain(minMax, `${hourToSet - 1}`, 0);
        timepicker.isAlertContains(minMax, `${timepicker.getHoursIn24Format(hourToSet - 1)}`);
      }
    });

    it(`when user chose (Max-1) hour, then arrow up become unclickable, max hour, which user can chose - A`, () => {
      const minToSet = 35;
      const hourToSet = new Date().getHours() <= 12 ? 16 : 4;
      timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
      timepicker.clickOnArrow(minMax, 'up', 0);
      timepicker.isAlertContains(minMax, `${timepicker.getHoursIn24Format(hourToSet + 1)}`);
    });

    it(`when user chose (B) hour, then arrow down become unclickable, min hour, which user can chose - B`, () => {
      const minToSet = 35;
      if (new Date().getHours() > 12) {
        timepicker.setTimeInInputs(minMax, 1, minToSet);
        timepicker.clickOnArrow(minMax, 'down', 0);
        timepicker.clickOnArrow(minMax, 'down', 0);
      }
      const hourToSet = 8;
      timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
      timepicker.clickOnArrow(minMax, 'down', 0);
      timepicker.isAlertContains(minMax, `${hourToSet}`);
      timepicker.isArrowDisabled(minMax, 'down', 0);
    });

    it(`when user send valid hour to the input, from interval (B-A), then input, alert changed appropriate`, () => {
      const currentHours = new Date().getHours();
      const expectedHours = currentHours >= 12 ? (maxHours - 2) : (minHours + 2);
      timepicker.clearInputAndSendKeys(minMax, `${expectedHours}`, 0);
      timepicker.triggerEventOnInput(minMax, 'change', 0);
      timepicker.isInputValueContain(minMax, `${expectedHours}`, 0);
      timepicker.isAlertContains(minMax, currentHours >= 12 ? `${expectedHours + 12}` : `${expectedHours}`);
    });

    it(`when user send invalid data to the input, then red border appear, danger alert show "Time is: "`, () => {
      const expectedHour = '78';
      timepicker.clearInputAndSendKeys(minMax, expectedHour, 0);
      timepicker.triggerEventOnInput(minMax, 'change', 0);
      timepicker.isInputValueContain(minMax, expectedHour, 0);
      timepicker.isInputHaveInvalidStatus(minMax, true, 0);
      timepicker.isAlertContains(minMax, 'Time is: ');
    });
  });

  describe(`Minutes`, () => {
    it(`when user clicks on arrow up, then input data and info alert changed appropriate (step = 5 minutes)`, () => {
      const minToSet = 23;
      const hourToSet = new Date().getHours() <= 12 ? 11 : 3;
      timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
      timepicker.clickOnArrow(minMax, 'up', 1);
      timepicker.isInputValueContain(minMax, `${minToSet + 5}`, 1);
      timepicker.isAlertContains(minMax, `${minToSet + 5}`);
    });

    it(`when user clicks on arrow down, then input data and alert changed appropriate (step = 5 minutes)`, () => {
      const minToSet = 48;
      const hourToSet = new Date().getHours() <= 12 ? 11 : 3;
      timepicker.setTimeInInputs(minMax, hourToSet, minToSet);
      timepicker.clickOnArrow(minMax, 'down', 1);
      timepicker.isInputValueContain(minMax, `${minToSet - 5}`, 1);
      timepicker.isAlertContains(minMax, `${minToSet - 5}`);
    });

    it(`when user send valid minute to the input, from (0-60), then input, alert changed appropriate`, () => {
      const expectedMinute = 21;
      const newDate = new Date();
      const currentHour24Format = newDate.getHours();
      const currentMinutes = newDate.getHours();
      if (currentHour24Format < maxHours + 12 && currentMinutes !== 0) {
        timepicker.clearInputAndSendKeys(minMax, `${expectedMinute}`, 1);
        timepicker.triggerEventOnInput(minMax, 'change', 1);
        timepicker.isInputValueContain(minMax, `${expectedMinute}`, 1);
        timepicker.isAlertContains(minMax, `${expectedMinute}`);
      }
    });

    it(`when user send invalid data to the input, then red border appear, danger alert show "Time is: "`, () => {
      const expectedMinute = 78;
      const currentHour24Format = new Date().getHours();
      if (currentHour24Format >= minHours) {
        timepicker.clearInputAndSendKeys(minMax, `${expectedMinute}`, 1);
        timepicker.triggerEventOnInput(minMax, 'change', 1);
        timepicker.isInputValueContain(minMax, `${expectedMinute}`, 1);
        timepicker.isInputHaveInvalidStatus(minMax, true, 1);
        timepicker.isAlertContains(minMax, 'Time is: ');
      }
    });
  });
});
