import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Readonly', () => {
  const timepicker = new TimepickerPo();
  const readonly = timepicker.exampleDemosArr.readonly;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker with inputs and current time, button "Editable / Readonly input"`, () => {
    timepicker.isTimepickerVisible(readonly);
    timepicker.isButtonExist(readonly, 'Editable / Readonly input', 0);
  });

  it(`when user clicks on "Editable / Readonly" button, then timepicker inputs, buttons
    become unclickable and readonly`, () => {
    timepicker.clickOnBtn(readonly, 0);
    timepicker.isArrowDisabled(readonly, 'up', 0);
    timepicker.isArrowDisabled(readonly, 'up', 1);
    timepicker.isArrowDisabled(readonly, 'down', 0);
    timepicker.isArrowDisabled(readonly, 'down', 1);
    timepicker.isInputReadonly(readonly, 0, true);
    timepicker.isInputReadonly(readonly, 1, true);
  });

  it(`when user clicks on "Editable / Readonly" button again, then timepicker inputs become clickable,
    after clicks on arrow up near hour and minute input, then hours increased at 1 and minutes increased at 5`, () => {
    const newDate = new Date();
    const expectedHour24Format = newDate.getHours() === 23 ? '01' : newDate.getHours() + 1;
    const expectedMinute = newDate.getMinutes() < 55 ? newDate.getMinutes() : newDate.getMinutes() - 60;
    timepicker.clickOnBtn(readonly, 0);
    timepicker.clickOnBtn(readonly, 0);
    timepicker.isInputReadonly(readonly, 0, false);
    timepicker.isInputReadonly(readonly, 1, false);
    timepicker.clickOnArrow(readonly, 'up', 0);
    timepicker.isInputValueContain(readonly, `${expectedHour24Format}`, 0);
    timepicker.clickOnArrow(readonly, 'up', 1);
    timepicker.isInputValueContain(readonly, `${expectedMinute + 5}`, 1);
  });

  it(`when user clicks on "Editable / Readonly" button again, then timepicker inputs become clickable,
    after clicks on arrow down under the hour and minute, then hours decreased at 1 and minutes decreased at 5`, () => {
    const newDate = new Date();
    const expectedHour24Format = newDate.getHours() === 1 ? 23 : newDate.getHours() - 1;
    const expectedMinute = newDate.getMinutes() <= 5 ? newDate.getMinutes() + 60 : newDate.getMinutes();
    timepicker.clickOnBtn(readonly, 0);
    timepicker.clickOnBtn(readonly, 0);
    timepicker.isInputReadonly(readonly, 0, false);
    timepicker.isInputReadonly(readonly, 1, false);
    timepicker.clickOnArrow(readonly, 'down', 1);
    timepicker.isInputValueContain(readonly, `${expectedMinute - 5}`, 1);
    timepicker.clickOnArrow(readonly, 'down', 0);
    timepicker.isInputValueContain(readonly, `${expectedHour24Format}`, 0);
  });
});
