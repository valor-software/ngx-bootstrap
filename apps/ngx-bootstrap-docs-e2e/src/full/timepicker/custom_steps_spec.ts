import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Custom steps', () => {
  const timepicker = new TimepickerPo();
  const customSteps = timepicker.exampleDemosArr.customSteps;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker with hour, minute, second, button "AM"("PM"), prev with current time,
    3 dropdowns "Hours step is:", "Minutes step is:", "Seconds step is:", chosen (1|15|10) values by default`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(customSteps);
    timepicker.isTimepickerInputExist(customSteps, 'minutes');
    timepicker.isTimepickerInputExist(customSteps, 'seconds');
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
      const hourToSet = 4;
      const minToSet = 25;
      timepicker.setTimeInInputs(customSteps, hourToSet, minToSet);
      timepicker.clickOnArrow(customSteps, 'up', 0);
      timepicker.isInputValueContain(customSteps, `${hourToSet + 1}`, 0);
      timepicker.isAlertContains(customSteps, `${timepicker.getHoursIn24Format(hourToSet + 1)}`);
      timepicker.clickOnArrow(customSteps, 'down', 0);
      timepicker.isInputValueContain(customSteps, `${hourToSet}`, 0);
      timepicker.isAlertContains(customSteps, `${timepicker.getHoursIn24Format(hourToSet)}`);
    });

    it(`when user clicks on dropdown "Hours step is:" and select "N", then this value is selected,
      when user clicks on arrow up above the hours, then value increased at N and info alert changed,
      when user clicks on arrow down, then input value decreased at N and info alert changed appropriate`, () => {
      const hourStep = [2, 3];
      const hourToSet = 4;
      const minToSet = 25;
      hourStep.forEach(step => {
        timepicker.selectOption(customSteps, step, 0);
        timepicker.setTimeInInputs(customSteps, hourToSet, minToSet);
        timepicker.clickOnArrow(customSteps, 'up', 0);
        timepicker.isInputValueContain(customSteps, `${hourToSet + step}`, 0);
        timepicker.isAlertContains(customSteps, `${timepicker.getHoursIn24Format(hourToSet + step)}`);
        timepicker.clickOnArrow(customSteps, 'down', 0);
        timepicker.isInputValueContain(customSteps, `${hourToSet}`, 0);
        timepicker.isAlertContains(customSteps, `${timepicker.getHoursIn24Format(hourToSet)}`);
      });
    });
  });

  describe('Minutes', () => {
    it(`when user clicks on arrow up above the minutes, then value increased at 15 and info alert changed,
      when user clicks on arrow down, then input value decreased at 15 and info alert changed appropriate`, () => {
      const hourToSet = 3;
      const minToSet = 28;
      timepicker.setTimeInInputs(customSteps, hourToSet, minToSet);
      timepicker.clickOnArrow(customSteps, 'up', 1);
      timepicker.isInputValueContain(customSteps, `${minToSet + 15}`, 1);
      timepicker.isAlertContains(customSteps, `${minToSet + 15}`);
      timepicker.clickOnArrow(customSteps, 'down', 1);
      timepicker.isInputValueContain(customSteps, `${minToSet}`, 1);
      timepicker.isAlertContains(customSteps, `${minToSet}`);
    });

    it(`when user clicks on dropdown "Minutes step is:" and select "M", then this value is selected,
      when user clicks on arrow up above the minutes, then value increased at M and info alert changed,
      when user clicks on arrow down, then input value decreased at M and info alert changed appropriate`, () => {
      const hourToSet = 3;
      const minToSet = 29;
      const minutesStep = [5, 30];
      minutesStep.forEach(step => {
        timepicker.selectOption(customSteps, step, 1);
        timepicker.setTimeInInputs(customSteps, hourToSet, minToSet);
        timepicker.clickOnArrow(customSteps, 'up', 1);
        timepicker.isInputValueContain(customSteps, `${minToSet + step}`, 1);
        timepicker.isAlertContains(customSteps, `${minToSet + step}`);
        timepicker.clickOnArrow(customSteps, 'down', 1);
        timepicker.isInputValueContain(customSteps, `${minToSet}`, 1);
        timepicker.isAlertContains(customSteps, `${minToSet}`);
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
