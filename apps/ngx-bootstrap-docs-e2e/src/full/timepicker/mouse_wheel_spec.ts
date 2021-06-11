import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Mouse wheel', () => {
  const timepicker = new TimepickerPo();
  const mouseWheel = timepicker.exampleDemosArr.mousewheel;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker with hour, minutes, button "AM"("PM"), prev with current time and
    button "Enable / Diseble mouse wheel"`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(mouseWheel);
    timepicker.isAlertContains(mouseWheel, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(mouseWheel, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(mouseWheel, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(mouseWheel, (newDate.getHours() >= 12) ? 'PM ' : 'AM ');
  });

  it(`when user activates hours input and scroll up/down with mouse wheel then time number increases/decreases
  with appropriate changes in info alert`, () => {
    const newDate = new Date();
    const hour12Format = timepicker.getHoursIn12Format(newDate);
    const hour24Format = newDate.getHours();
    timepicker.clickOnInput(mouseWheel, 0);
    // For triggering mouse wheel event, need to set event name and deltaY, because of wheelSign method
    // For scrolling up, deltaY should be < 0, for scrolling down, deltaY should be > 0
    timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: -1});
    timepicker.isInputValueContain(mouseWheel, `${hour12Format === 12 ? 1 : hour12Format + 1}`, 0);
    timepicker.isAlertContains(mouseWheel, `${hour24Format === 23 ? 0 : hour24Format + 1}`);
    timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: 1});
    timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
    timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
  });

  it(`when user activates minutes input and scroll up/down with mouse wheel then time number increases/decreases
  with appropriate changes in info alert`, () => {
    const currentMinutes = new Date().getMinutes();
    timepicker.clickOnInput(mouseWheel, 1);
    timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: -1});
    timepicker.isInputValueContain(mouseWheel, `${
      currentMinutes < 55 ? currentMinutes + 5 : currentMinutes - 60 + 5}`, 1);
    timepicker.isAlertContains(mouseWheel, `${
      currentMinutes < 55 ? currentMinutes + 5 : currentMinutes - 60 + 5}`);
    timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: 1});
    timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
    timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
  });

  it(`when user clicks on "Enable / Disable" button, activates hours input and scroll up/down with mouse wheel,
  then hours stay the same, after activates minutes and scroll up/down with mouse wheel, then minutes stay the same`,
    () => {
      const newDate = new Date();
      const currentMinutes = newDate.getMinutes();
      const hour12Format = timepicker.getHoursIn12Format(newDate);
      const hour24Format = newDate.getHours();
      timepicker.clickOnBtn(mouseWheel, 1);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: -1});
      timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
      timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: 1});
      timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
      timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: -1});
      timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
      timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: 1});
      timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
      timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
    });

  it(`when user changes hours and minutes by arrow navigation, data change successfully`, () => {
    const newDate = new Date();
    const currentMinutes = newDate.getMinutes();
    const hour12Format = timepicker.getHoursIn12Format(newDate);
    const hour24Format = newDate.getHours();
    timepicker.clickOnArrow(mouseWheel, 'up', 1);
    timepicker.isInputValueContain(mouseWheel, `${
      currentMinutes < 55 ? currentMinutes + 5 : currentMinutes - 60 + 5}`, 1);
    timepicker.isAlertContains(mouseWheel, `${
      currentMinutes < 55 ? currentMinutes + 5 : currentMinutes - 60 + 5}`);
    timepicker.clickOnArrow(mouseWheel, 'down', 1);
    timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
    timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
    timepicker.clickOnArrow(mouseWheel, 'up', 0);
    timepicker.isInputValueContain(mouseWheel, `${hour12Format === 12 ? 1 : hour12Format + 1}`, 0);
    timepicker.isAlertContains(mouseWheel, `${hour24Format === 23 ? 0 : hour24Format + 1}`);
    timepicker.clickOnArrow(mouseWheel, 'down', 0);
    timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
    timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
  });

  it(`when user clicks on "Enable / Disable mouse wheel" button again, then user can change hours
  and minutes with mouse wheel scrolling again`,
    () => {
      const newDate = new Date();
      const currentMinutes = newDate.getMinutes();
      const hour12Format = timepicker.getHoursIn12Format(newDate);
      const hour24Format = newDate.getHours();
      timepicker.clickOnBtn(mouseWheel, 1);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: -1});
      timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
      timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 0, {deltaY: 1});
      timepicker.isInputValueContain(mouseWheel, `${hour12Format}`, 0);
      timepicker.isAlertContains(mouseWheel, `${hour24Format}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: -1});
      timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
      timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
      timepicker.triggerEventOnInput(mouseWheel, 'wheel', 1, {deltaY: 1});
      timepicker.isInputValueContain(mouseWheel, `${currentMinutes}`, 1);
      timepicker.isAlertContains(mouseWheel, `${currentMinutes}`);
    });
});
