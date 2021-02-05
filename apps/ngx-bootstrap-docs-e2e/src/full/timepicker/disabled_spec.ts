import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Disabled', () => {
  const timepicker = new TimepickerPo();
  const disabled = timepicker.exampleDemosArr.disabled;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker component and clickable button "AM"("PM") (according to the current time),
    user see clickable button "Enable / Disable input"`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(disabled);
    timepicker.isButtonExist(disabled, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isButtonExist(disabled, 'Enable / Disable input', 1);
  });

  it(`when user clicks on "Enable / Disable input" button, then timepicker inputs, buttons become disabled`, () => {
    timepicker.clickOnBtn(disabled, 1);
    timepicker.isButtonDisabled(disabled, 0);
    timepicker.isArrowDisabled(disabled, 'up', 0);
    timepicker.isArrowDisabled(disabled, 'up', 1);
    timepicker.isArrowDisabled(disabled, 'down', 0);
    timepicker.isArrowDisabled(disabled, 'down', 1);
    timepicker.isInputDisabled(disabled, 0, true);
    timepicker.isInputDisabled(disabled, 1, true);
  });

  it(`when user clicks on "Enable / Disable input" button, then timepicker inputs, buttons become disabled`, () => {
    timepicker.clickOnBtn(disabled, 1);
    timepicker.isButtonDisabled(disabled, 0);
    timepicker.isArrowDisabled(disabled, 'up', 0);
    timepicker.isArrowDisabled(disabled, 'up', 1);
    timepicker.isArrowDisabled(disabled, 'down', 0);
    timepicker.isArrowDisabled(disabled, 'down', 1);
    timepicker.isInputDisabled(disabled, 0, true);
    timepicker.isInputDisabled(disabled, 1, true);
  });

  it(`when user clicks on "Enable / Disable input" again, then timepicker inputs, buttons become clickable,
    after click on arrow up above the hour, minute input, then hours increased at 1 and minutes increased at 5`, () => {
    const hourToSet = 7;
    const minToSet = 35;
    timepicker.setTimeInInputs(disabled, hourToSet, minToSet);
    timepicker.clickOnBtn(disabled, 1);
    timepicker.clickOnBtn(disabled, 1);
    timepicker.isButtonDisabled(disabled, 0, false);
    timepicker.isInputDisabled(disabled, 0, false);
    timepicker.isInputDisabled(disabled, 1, false);
    timepicker.clickOnArrow(disabled, 'up', 0);
    timepicker.isInputValueContain(disabled, `${hourToSet + 1}`, 0);
    timepicker.clickOnArrow(disabled, 'up', 1);
    timepicker.isInputValueContain(disabled, `${minToSet + 5}`, 1);
  });

  it(`when user clicks on "Enable / Disable input" again, then timepicker inputs, buttons become clickable,
    after click on arrow down for hour, minute input, then hours decreased at 1 and minutes decreased at 5`, () => {
    const hourToSet = 7;
    const minToSet = 35;
    timepicker.setTimeInInputs(disabled, hourToSet, minToSet);
    timepicker.clickOnBtn(disabled, 1);
    timepicker.clickOnBtn(disabled, 1);
    timepicker.isButtonDisabled(disabled, 0, false);
    timepicker.isInputDisabled(disabled, 0, false);
    timepicker.isInputDisabled(disabled, 1, false);
    timepicker.clickOnArrow(disabled, 'down', 1);
    timepicker.isInputValueContain(disabled, `${minToSet - 5}`, 1);
    timepicker.clickOnArrow(disabled, 'down', 0);
    timepicker.isInputValueContain(disabled, `${hourToSet - 1}`, 0);
  });
});
