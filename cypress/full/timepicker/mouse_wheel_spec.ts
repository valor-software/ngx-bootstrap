import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Readonly', () => {
  beforeEach(() => timepicker.navigateTo());
  const timepicker = new TimepickerPo();
  const mouseWheel = timepicker.exampleDemosArr.mousewheel;
  const newDate = new Date();
  const btnEnableDisable = 'Enable / Diseble mouse wheel';

  it(`example contains timepicker with hour, minutes, button "AM"("PM"), prev with current time and
    button "Enable / Diseble mouse wheel"`, () => {
    timepicker.isTimepickerVisible(mouseWheel);
    timepicker.isAlertContains(mouseWheel, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(mouseWheel, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(mouseWheel, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(mouseWheel, (newDate.getHours() >= 12) ? 'PM ' : 'AM ');
  });

  // TODO: find a way how change with mousewheel
  // it(`when user activates hours input and scroll up/down with mouse wheel then time number increases/decreases
  // with appropriate changes in info alert`, () => {
  //   timepicker.clickOnInput(mouseWheel, 0);
  //
  // });
  //
  // it(`when user activates minutes input and scroll up/down with mouse wheel then time number increases/decreases
  // with appropriate changes in info alert`, () => {
  //
  // });
  //
  // it(`when user changes current time mouse wheel and the is changed then "AM"("PM") button is changed too`,
  //   () => {
  //
  //   });
  //
  // it(`when user clicks on "Enable / Disable mouse wheel" button then hours and minutes inputs are disabled for
  // changing with mouse wheel`, () => {
  //
  // });
});
