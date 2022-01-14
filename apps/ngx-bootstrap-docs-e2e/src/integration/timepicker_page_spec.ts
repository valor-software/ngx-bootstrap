import { TimepickerPo } from '../support/timepicker.po';

describe('Timepicker demo page testing suite', () => {
  const timepicker = new TimepickerPo();

  beforeEach(() => timepicker.navigateTo());

  describe('Basic', () => {
    const basic = timepicker.exampleDemosArr.basic;

    it(`example contains timepicker component, info alert with selected date and time (current by default),
    current hour and current min in timepicker inputs, button "AM/PM" (depend on the current time) by default`, () => {
      const newDate = new Date();
      timepicker.isTimepickerVisible(basic);
      timepicker.isAlertContains(basic, `Time is: ${newDate.toString().split(':')[0]}`);
      timepicker.isInputValueContain(basic, `${timepicker.getHoursIn12Format(newDate)}`, 0);
      timepicker.isInputValueContain(basic, `${newDate.getMinutes()}`, 1);
      timepicker.isButtonExist(basic, (newDate.getHours() >= 12) ? 'PM ' : 'AM ');
    });

    describe('Hours', () => {
      beforeEach(() => timepicker.scrollToMenu('Basic'));

      it(`when user clicks on arrow up above the hour, then number in the input increased at 1, alert changed`, () => {
        const hourToSet = 2;
        const minToSet = 12;
        timepicker.setTimeInInputs(basic, hourToSet, minToSet);
        timepicker.clickOnArrow(basic, 'up', 0);
        timepicker.isInputValueContain(basic, `${hourToSet + 1}`, 0);
        timepicker.isAlertContains(basic, `${timepicker.getHoursIn24Format(hourToSet + 1)}`);
      });

      it(`when user clicks on arrow down under the hour, then number in input decreased at 1, alert changed`, () => {
        const hourToSet = 4;
        const minToSet = 18;
        timepicker.setTimeInInputs(basic, hourToSet, minToSet);
        timepicker.clickOnArrow(basic, 'down', 0);
        timepicker.isInputValueContain(basic, `${hourToSet - 1}`, 0);
        timepicker.isAlertContains(basic, `${timepicker.getHoursIn24Format(hourToSet - 1)}`);
      });

      it(`when user send valid (1-12) number to input and click outside, then number saved and alert changed`, () => {
        const expectedHour = 3;
        timepicker.clearInputAndSendKeys(basic, `${expectedHour}`, 0);
        timepicker.triggerEventOnInput(basic, 'change');
        timepicker.isInputValueContain(basic, `${expectedHour}`, 0);
        timepicker.isAlertContains(basic, `${timepicker.getHoursIn24Format(expectedHour)}`);
      });

      it(`when user send invalid number or string to input and click outside,
    then the red border appeared in input and danger alert shown "Time is: " info`, () => {
        const expectedHour = '99';
        timepicker.clearInputAndSendKeys(basic, expectedHour, 0);
        timepicker.triggerEventOnInput(basic, 'change');
        timepicker.isInputValueContain(basic, expectedHour, 0);
        timepicker.isInputHaveInvalidStatus(basic, true);
        timepicker.isAlertContains(basic, 'Time is: ');
      });
    });

    describe('Minutes', () => {
      it(`when user clicks on arrow up above minute, then number in the input increased at 5, alert changed`, () => {
        const hourToSet = 4;
        const minToSet = 18;
        timepicker.setTimeInInputs(basic, hourToSet, minToSet);
        timepicker.clickOnArrow(basic, 'up', 1);
        timepicker.isInputValueContain(basic, `${minToSet + 5}`, 1);
        timepicker.isAlertContains(basic, `${minToSet + 5}`);
      });

      it(`when user clicks on arrow down under the minute, then number in input decreased at 5, alert changed`, () => {
        const hourToSet = 4;
        const minToSet = 38;
        timepicker.setTimeInInputs(basic, hourToSet, minToSet);
        timepicker.clickOnArrow(basic, 'down', 1);
        timepicker.isInputValueContain(basic, `${minToSet - 5}`, 1);
        timepicker.isAlertContains(basic, `${minToSet - 5}`);
      });

      it(`when user send valid (00-60) number to input and click outside, then number saved and alert changed`, () => {
        const expectedMinute = '18';
        timepicker.clearInputAndSendKeys(basic, expectedMinute, 1);
        timepicker.triggerEventOnInput(basic, 'change', 1);
        timepicker.isInputValueContain(basic, expectedMinute, 1);
        timepicker.isAlertContains(basic, expectedMinute);
      });

      it(`when user send invalid data to input, then the red border appeared in input and danger alert shown`, () => {
        const expectedMinuteStr = 'as';
        timepicker.clearInputAndSendKeys(basic, expectedMinuteStr, 1);
        timepicker.triggerEventOnInput(basic, 'change', 1);
        timepicker.isInputValueContain(basic, expectedMinuteStr, 1);
        timepicker.isInputHaveInvalidStatus(basic, true, 1);
        timepicker.isAlertContains(basic, 'Time is: ');
        const expectedMinuteNum = '99';
        timepicker.clearInputAndSendKeys(basic, expectedMinuteNum, 1);
        timepicker.triggerEventOnInput(basic, 'change', 1);
        timepicker.isInputValueContain(basic, expectedMinuteNum, 1);
        timepicker.isInputHaveInvalidStatus(basic, true, 1);
        timepicker.isAlertContains(basic, 'Time is: ');
      });
    });

    describe('AM/PM', () => {
      it('when user clicks on "PM"("AM"), then it changed to "AM"("PM") and time converted appropriate', () => {
        const currentHours = new Date().getHours();
        timepicker.getMeridianValue(basic).then(firstMeridian => {
          timepicker.clickOnBtn(basic);
          timepicker.getMeridianValue(basic).then(secondMeridian => {
            expect(firstMeridian).not.to.equal(secondMeridian);
            timepicker.isAlertContains(basic, `${currentHours + (currentHours >= 12 ? -12 : 12)}`);
          });
        });
      });
    });
  });
});
