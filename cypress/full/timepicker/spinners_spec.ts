import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Spinners', () => {
  beforeEach(() => timepicker.navigateTo());
  const timepicker = new TimepickerPo();
  const spinners = timepicker.exampleDemosArr.spinners;
  const newDate = new Date();
  const btnShowHide = 'Show / Hide spinners';

  it(`example contains timepicker component, info alert with selected date and time (current by default),
    current hour and current min in timepicker inputs and the button "Show / Hide spinners"`, () => {
    timepicker.scrollToMenu('Spinners');
    timepicker.isInputValueContain(spinners, `${newDate.getHours()}`, 0);
    timepicker.isInputValueContain(spinners, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(spinners, btnShowHide);
  });

  it(`when user clicks on "Show / Hide spinners" button, then arrows disappeared. user is able to change
  hours and minutes only through the input`, () => {
    timepicker.clickByText(spinners, btnShowHide);
    timepicker.isArrowVisible(spinners, '.bs-chevron-up', false, 0);
    timepicker.isArrowVisible(spinners, '.bs-chevron-down', false, 0);
    timepicker.isArrowVisible(spinners, '.bs-chevron-up', false, 1);
    timepicker.isArrowVisible(spinners, '.bs-chevron-down', false, 1);
    timepicker.clearInputAndSendKeys(spinners, '14', 0);
    timepicker.isInputValueContain(spinners, '14', 0);
    timepicker.clearInputAndSendKeys(spinners, '05', 1);
    timepicker.isInputValueContain(spinners, '05', 1);
  });

  it(`when user clicks on "Show / Hide spinners" button again, then arrows appeared again. user is able to
  change hours and minutes through the input and through the arrows up and down`, () => {
    const expectedHour24Format = newDate.getHours() === 1 ? '12' : newDate.getHours() - 1;
    const currentMinutes = new Date().getMinutes();
    const expectedMinute = currentMinutes < 55 ? currentMinutes : -(currentMinutes - 60);
    timepicker.clickByText(spinners, btnShowHide);
    timepicker.isArrowDisabled(spinners, 'up', 0, false);
    timepicker.isArrowDisabled(spinners, 'down', 0, false);
    timepicker.isArrowDisabled(spinners, 'up', 1, false);
    timepicker.isArrowDisabled(spinners, 'down', 1, false);
    timepicker.clickOnArrow(spinners, 'down', 0);
    timepicker.isInputValueContain(spinners, `${expectedHour24Format}`);
    timepicker.clickOnArrow(spinners, 'up', 1);
    timepicker.isInputValueContain(spinners, `${expectedMinute + 5}`, 1);
  });
});

