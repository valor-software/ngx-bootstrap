import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Custom steps', () => {
  const timepicker = new TimepickerPo();
  const customSteps = timepicker.exampleDemosArr.customSteps;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker with hour, minute, second, button "AM"("PM"), prev with current time,
    3 dropdowns "Hours step is:", "Minutes step is:", "Seconds step is:", chosen (1|15|10) values by default`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(customSteps);
    timepicker.isTimepickerInputVisible(customSteps, 'minutes');
    timepicker.isTimepickerInputVisible(customSteps, 'seconds');
    timepicker.isButtonExist(customSteps, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isAlertContains(customSteps, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isDemoContainsTxt(customSteps, 'Hours step is:');
    timepicker.isDemoContainsTxt(customSteps, 'Minutes step is:');
    timepicker.isDemoContainsTxt(customSteps, 'Seconds step is:');
    timepicker.isSelectExist(customSteps, '1', 0);
    timepicker.isSelectExist(customSteps, '15', 1);
    timepicker.isSelectExist(customSteps, '10', 1);
  });

  describe('Hours', () => {
    it(`when user clicks on arrow up above the hours, then value increased at 1 and info alert changed,
      when user clicks on arrow down, then input value decreased at 1 and info alert changed appropriate`, () => {
      const newDate = new Date();
      const hour12Format = timepicker.getHoursIn12Format(newDate);
      const hour24Format = newDate.getHours();
      timepicker.clickOnArrow(customSteps, 'up', 0);
      timepicker.isInputValueContain(customSteps, `${hour12Format === 12 ? 1 : hour12Format + 1}`, 0);
      timepicker.isAlertContains(customSteps, `${hour24Format === 23 ? 0 : hour24Format + 1}`);
      timepicker.clickOnArrow(customSteps, 'down', 0);
      timepicker.isInputValueContain(customSteps, `${hour12Format}`, 0);
      timepicker.isAlertContains(customSteps, `${hour24Format}`);
    });

    it(`when user clicks on dropdown "Hours step is:" and select "N", then this value is selected,
      when user clicks on arrow up above the hours, then value increased at N and info alert changed,
      when user clicks on arrow down, then input value decreased at N and info alert changed appropriate`, () => {
      const newDate = new Date();
      const hour12Format = timepicker.getHoursIn12Format(newDate);
      const hour24Format = newDate.getHours();
      const hourStep = [2, 3];
      hourStep.forEach(step => {
        timepicker.selectOption(customSteps, step, 0);
        timepicker.clickOnArrow(customSteps, 'up', 0);
        timepicker.isInputValueContain(customSteps, `${
          hour12Format >= 13 - step ? (hour12Format + step - 12) : (hour12Format + step)}`, 0);
        timepicker.isAlertContains(customSteps, `${
          hour24Format >= 24 - step ? (hour24Format + step - 24) : (hour24Format + step)}`);
        timepicker.clickOnArrow(customSteps, 'down', 0);
        timepicker.isInputValueContain(customSteps, `${hour12Format}`, 0);
        timepicker.isAlertContains(customSteps, `${hour24Format}`);
      });
    });
  });

  describe('Minutes', () => {
    it(`when user clicks on arrow up above the minutes, then value increased at 15 and info alert changed,
      when user clicks on arrow down, then input value decreased at 15 and info alert changed appropriate`, () => {
      const currentMinutes = new Date().getMinutes();
      timepicker.clickOnArrow(customSteps, 'up', 1);
      timepicker.isInputValueContain(customSteps, `${
        currentMinutes < 45 ? currentMinutes + 15 : currentMinutes - 60 + 15}`, 1);
      timepicker.isAlertContains(customSteps, `${
        currentMinutes < 45 ? currentMinutes + 15 : currentMinutes - 60 + 15}`);
      timepicker.clickOnArrow(customSteps, 'down', 1);
      timepicker.isInputValueContain(customSteps, `${currentMinutes}`, 1);
      timepicker.isAlertContains(customSteps, `${currentMinutes}`);
    });

    it(`when user clicks on dropdown "Minutes step is:" and select "M", then this value is selected,
      when user clicks on arrow up above the minutes, then value increased at M and info alert changed,
      when user clicks on arrow down, then input value decreased at M and info alert changed appropriate`, () => {
      const currentMinutes = new Date().getMinutes();
      const minutesStep = [5, 30];
      minutesStep.forEach(step => {
        timepicker.selectOption(customSteps, step, 1);
        timepicker.clickOnArrow(customSteps, 'up', 1);
        timepicker.isInputValueContain(customSteps, `${
          currentMinutes > 60 - step ? (currentMinutes + step - 60) : (currentMinutes + step)}`, 1);
        timepicker.isAlertContains(customSteps, `${
          currentMinutes > 60 - step ? (currentMinutes + step - 60) : (currentMinutes + step)}`);
        timepicker.clickOnArrow(customSteps, 'down', 1);
        timepicker.isInputValueContain(customSteps, `${currentMinutes}`, 1);
        timepicker.isAlertContains(customSteps, `${currentMinutes}`);
      });
    });
  });

  describe('Seconds', () => {
    it(`when user clicks on arrow up above the seconds, then value increased at 10 and info alert changed,
      when user clicks on arrow down, then input value decreased at 10 and info alert changed appropriate`, () => {
      timepicker.clickOnArrow(customSteps, 'up', 2);
      timepicker.isInputValueVisible(customSteps, 2);
      timepicker.clickOnArrow(customSteps, 'down', 2);
      timepicker.isInputValueVisible(customSteps, 2);
    });

    it(`when user clicks on dropdown "Seconds step is:" and select "L", then this value is selected,
      when user clicks on arrow up above the seconds, then value increased at L and info alert changed,
      when user clicks on arrow down, then input value decreased at L and info alert changed appropriate`, () => {
      const secondsStep = [20, 30];
      secondsStep.forEach(step => {
        timepicker.selectOption(customSteps, step, 2);
        timepicker.clickOnArrow(customSteps, 'up', 2);
        timepicker.isInputValueVisible(customSteps, 2);
        timepicker.clickOnArrow(customSteps, 'down', 2);
        timepicker.isInputValueVisible(customSteps, 2);
      });
    });
  });
});
