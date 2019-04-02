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
    timepicker.isButtonDisabled(minMax, 0);
  });

  describe(`Hours`, () => {
    it(`when user clicks on arrow up, then input data and info alert changed appropriate`, () => {
      const newDate = new Date();
      const newDatePlusHour = new Date(2011, 2, 2, newDate.getHours() + 1);
      const expectedHour12Format = timepicker.getHoursIn12Format(newDatePlusHour);
      const expectedHour24Format = newDatePlusHour.getHours();
      if (timepicker.getHoursIn12Format(newDate) < maxHours - 1) {
        timepicker.clickOnArrow(minMax, 'up', 0);
        timepicker.isInputValueContain(minMax, `${expectedHour12Format}`, 0);
        timepicker.isAlertContains(minMax, `${expectedHour24Format}`);
      }
    });

    it(`when user clicks on arrow down, then input data and info alert changed appropriate`, () => {
      const newDate = new Date();
      const expectedHour12Format =
        timepicker.getHoursIn12Format(newDate) === 1 ? '12' : timepicker.getHoursIn12Format(newDate) - 1;
      const expectedHour24Format = newDate.getHours() === 1 ? '12' : newDate.getHours() - 1;
      if (timepicker.getHoursIn12Format(newDate) >= minHours) {
        timepicker.clickOnArrow(minMax, 'down', 0);
        timepicker.isInputValueContain(minMax, `${expectedHour12Format}`, 0);
        timepicker.isAlertContains(minMax, `${expectedHour24Format}`);
      }
    });

    it(`when user chose (Max-1) hour, then arrow up become unclickable, max hour, which user can chose - A`, () => {
      const newDate = new Date();
      let currentHour24Format = newDate.getHours();
      while (currentHour24Format < maxHours - 1 + 12 && newDate.getMinutes() !== 0) {
        timepicker.clickOnArrow(minMax, 'up', 0);
        currentHour24Format += 1;
      }
      timepicker.isAlertContains(minMax, `${currentHour24Format}`);
      timepicker.isArrowDisabled(minMax, 'up', 0);
    });

    it(`when user chose (B) hour, then arrow down become unclickable, min hour, which user can chose - B`, () => {
      const newDate = new Date();
      let currentHour24Format = newDate.getHours();
      while (currentHour24Format >= minHours) {
        timepicker.clickOnArrow(minMax, 'down', 0);
        currentHour24Format = currentHour24Format - 1;
      }
      timepicker.isInputValueContain(minMax, `0${minHours}`, 0);
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
      const newDate = new Date();
      const currentMinutes = newDate.getMinutes();
      const currentHour24Format = newDate.getHours();
      const expectedMinute = currentMinutes < 55 ? currentMinutes : currentMinutes - 60;
      if (currentHour24Format < maxHours + 12 && new Date().getMinutes() !== 0) {
        timepicker.clickOnArrow(minMax, 'up', 1);
        timepicker.isInputValueContain(minMax, `${expectedMinute + 5}`, 1);
        timepicker.isAlertContains(minMax, `${expectedMinute + 5}`);
      }
    });

    it(`when user clicks on arrow down, then input data and alert changed appropriate (step = 5 minutes)`, () => {
      const newDate = new Date();
      const currentMinutes = new Date().getMinutes();
      const currentHour24Format = newDate.getHours();
      const expectedMinute = currentMinutes <= 5 ? currentMinutes + 60 : currentMinutes;
      if (currentHour24Format >= minHours && currentHour24Format < maxHours + 12) {
        timepicker.clickOnArrow(minMax, 'down', 1);
        timepicker.isInputValueContain(minMax, `${expectedMinute - 5}`, 1);
        timepicker.isAlertContains(minMax, `${expectedMinute - 5}`);
      }
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
