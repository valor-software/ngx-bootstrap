import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page test suite: Configuring defaults', () => {
  beforeEach(() => timepicker.navigateTo());
  const timepicker = new TimepickerPo();
  const configDefaults = timepicker.exampleDemosArr.configDefaults;

  it(`example contains timepicker component with hour, minute inputs and success alert. timepicker inputs
  have placeholders "HH and "MM", alert has "Time is"`, () => {
    const hourPlaceholder = 'HH';
    const minutesPlaceholder = 'MM';
    timepicker.scrollToMenu('Configuring defaults');
    timepicker.isTimepickerVisible(configDefaults);
    timepicker.isInputPlaceholderContains(configDefaults, hourPlaceholder);
    timepicker.isInputPlaceholderContains(configDefaults, minutesPlaceholder, 1);
    timepicker.isAlertContains(configDefaults, 'Time is: ');
  });

  it(`when showMinutes is true then minutes input with arrows are shown,
  when showSeconds is false then the second input with arrows are not shown,
  when showMeridian is false then button "AM"("PM") should not appear`, () => {
    timepicker.isComponentSrcContain('Configuring defaults', 'showMinutes: true,');
    timepicker.isInputDisabled(configDefaults, 1, false);
    timepicker.isArrowDisabled(configDefaults, 'up', 1, false);
    timepicker.isArrowDisabled(configDefaults, 'down', 1, false);
    timepicker.isComponentSrcContain('Configuring defaults', 'showSeconds: false');
    timepicker.isElementExist(configDefaults, 'input', false, 2);
    timepicker.isComponentSrcContain('Configuring defaults', 'showMeridian: false');
    timepicker.isBtnShowMeridianExist();
  });

  it(`when readonlyInput is false then inputs and arrows should be clickable.
  when hourStep is set to A then hours increased/decreased at A and appropriate date and time shown in alert,
  when minuteStep is set to B then minutes number increased/decreased at B and appropriate date and time shown in alert`
    , () => {
      const newDate = new Date();
      const currentMinutes = new Date().getMinutes();
      const expectedHour12Format =
        timepicker.getHoursIn12Format(newDate) === 1 ? '12' : timepicker.getHoursIn12Format(newDate) - 1;
      const expectedMinute = currentMinutes < 55 ? currentMinutes : -(currentMinutes - 60);
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

  // TODO: find a way how change with mousewheel
  // it('when mousewheel is true then user able to change input values through the mouse wheel scrolling', () => {
  //   function myCustomMethod(event: string) {
  //     if (!event) {
  //       return;
  //   };
  //
  //   timepicker.isComponentSrcContain('Configuring defaults', 'mousewheel: true');
  //   timepicker.clearInputAndSendKeys(configDefaults, '2', 0);
  //   // cy.get(`${'demo-timepicker-config'} input`).eq(0).trigger('mousewheel', {source: 'wheel', step: 2});
  //   // timepicker.clickOnInput(configDefaults, 1);
  //   cy.window().get(`${'demo-timepicker-config'} input`).eq(0)
  //     .then(myCustomMethod());
  // });
});
