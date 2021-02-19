import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Configuring defaults', () => {
  const timepicker = new TimepickerPo();
  const configDefaults = timepicker.exampleDemosArr.configDefaults;

  beforeEach(() => {
    timepicker.navigateTo();
    timepicker.scrollToMenu('Configuring defaults');
  });

  it(`example contains timepicker component with hour, minute inputs and success alert, placeholders "HH and "MM",
   alert "Time is",  minutes with arrows are shown, seconds are hidden, button "AM"("PM") hidden`, () => {
    timepicker.isTimepickerVisible(configDefaults);
    timepicker.isInputPlaceholderContains(configDefaults, 'HH');
    timepicker.isInputPlaceholderContains(configDefaults, 'MM', 1);
    timepicker.isAlertContains(configDefaults, 'Time is: ');
    timepicker.isComponentSrcContain('Configuring defaults', 'showMinutes: true,');
    timepicker.isComponentSrcContain('Configuring defaults', 'showSeconds: false');
    timepicker.isComponentSrcContain('Configuring defaults', 'showMeridian: false');
    timepicker.isInputDisabled(configDefaults, 1, false);
    timepicker.isArrowDisabled(configDefaults, 'up', 1, false);
    timepicker.isArrowDisabled(configDefaults, 'down', 1, false);
  });

  it(`when readonlyInput is false then inputs and arrows should be clickable.
  when hourStep is set to A then hours increased/decreased at A, appropriate date and time shown in alert,
  when minuteStep is set to B then minutes increased/decreased at B and appropriate date, time shown in alert`, () => {
      timepicker.isComponentSrcContain('Configuring defaults', 'readonlyInput: false');
      timepicker.isComponentSrcContain('Configuring defaults', 'hourStep: 2');
      timepicker.isComponentSrcContain('Configuring defaults', 'minuteStep: 10');
      timepicker.isInputDisabled(configDefaults, 0, false);
      timepicker.isArrowDisabled(configDefaults, 'up', 0, false);
      timepicker.isArrowDisabled(configDefaults, 'down', 0, false);
      timepicker.isInputDisabled(configDefaults, 1, false);
      timepicker.isArrowDisabled(configDefaults, 'up', 1, false);
      timepicker.isArrowDisabled(configDefaults, 'down', 1, false);
      timepicker.clickOnArrow(configDefaults, 'up', 0);
      timepicker.isInputValueContain(configDefaults, '2');
      timepicker.clickOnArrow(configDefaults, 'down', 1);
      timepicker.isInputValueContain(configDefaults, '50', 1);
      timepicker.isAlertContains(configDefaults, '1:50');
    });


  it('when mousewheel is true then user able to change hours values through the mouse wheel scrolling', () => {
    timepicker.isComponentSrcContain('Configuring defaults', 'mousewheel: true');
    timepicker.clickOnArrow(configDefaults, 'up', 0);
    timepicker.triggerEventOnInput(configDefaults, 'wheel', 0, {deltaY: -1});
    timepicker.isInputValueContain(configDefaults, `04`, 0);
    timepicker.isAlertContains(configDefaults, `04`);
    timepicker.triggerEventOnInput(configDefaults, 'wheel', 0, {deltaY: 1});
    timepicker.isInputValueContain(configDefaults, `02`, 0);
    timepicker.isAlertContains(configDefaults, `02`);
  });

  it('when mousewheel is true then user able to change minutes values through the mouse wheel scrolling', () => {
    timepicker.clickOnArrow(configDefaults, 'up', 1);
    timepicker.triggerEventOnInput(configDefaults, 'wheel', 1, {deltaY: -1});
    timepicker.isInputValueContain(configDefaults, `20`, 1);
    timepicker.isAlertContains(configDefaults, `20`);
    timepicker.triggerEventOnInput(configDefaults, 'wheel', 1, {deltaY: 1});
    timepicker.isInputValueContain(configDefaults, `10`, 1);
    timepicker.isAlertContains(configDefaults, `10`);
  });
});
