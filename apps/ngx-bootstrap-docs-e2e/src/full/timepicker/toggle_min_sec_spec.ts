import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Toggle minutes/seconds', () => {
  const timepicker = new TimepickerPo();
  const toggleMinSec = timepicker.exampleDemosArr.toggleMinSec;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker with hours, minutes and seconds, button "AM"("PM"), alert with selected date,
    time, showMinutes: true, showSeconds: true, 2 clickable buttons "Hide minutes" and "Hide seconds"`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(toggleMinSec);
    timepicker.isInputValueContain(toggleMinSec, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(toggleMinSec, `${newDate.getMinutes()}`, 1);
    timepicker.isTimepickerInputExist(toggleMinSec, 'minutes');
    timepicker.isTimepickerInputExist(toggleMinSec, 'seconds');
    timepicker.isButtonExist(toggleMinSec, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isAlertContains(toggleMinSec, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isAlertContains(toggleMinSec, `showMinutes: trueshowSeconds: true`);
    timepicker.isButtonExist(toggleMinSec, ' Hide minutes\n', 1);
    timepicker.isButtonExist(toggleMinSec, ' Hide seconds\n', 2);
  });

  it(`when user clicks on "Hide minutes" button, then input and arrows with minutes hidden,
    info alert show "showMinutes: false"`, () => {
    const newDate = new Date();
    timepicker.clickOnBtn(toggleMinSec, 1);
    timepicker.isTimepickerInputExist(toggleMinSec, 'minutes', false);
    timepicker.isTimepickerInputExist(toggleMinSec, 'seconds');
    timepicker.isButtonExist(toggleMinSec, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isAlertContains(toggleMinSec, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isAlertContains(toggleMinSec, `showMinutes: falseshowSeconds: true`);
  });

  it(`when user clicks on "Hide seconds" button, then input and arrows with seconds hidden,
    info alert show "showSeconds: false"`, () => {
    const newDate = new Date();
    timepicker.clickOnBtn(toggleMinSec, 2);
    timepicker.isTimepickerInputExist(toggleMinSec, 'minutes');
    timepicker.isTimepickerInputExist(toggleMinSec, 'seconds', false);
    timepicker.isButtonExist(toggleMinSec, `${(newDate.getHours() >= 12) ? 'PM' : 'AM'} `, 0);
    timepicker.isAlertContains(toggleMinSec, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isAlertContains(toggleMinSec, `showMinutes: trueshowSeconds: false`);
  });

  it(`when user clicks on "Hide minutes" button again, then input and arrows with minutes shown,
    and info alert show "showMinutes: true"`, () => {
    const newDate = new Date();
    timepicker.clickOnBtn(toggleMinSec, 1);
    timepicker.clickOnBtn(toggleMinSec, 2);
    timepicker.clickOnBtn(toggleMinSec, 1);
    timepicker.isTimepickerInputExist(toggleMinSec, 'minutes');
    timepicker.isTimepickerInputExist(toggleMinSec, 'seconds', false);
    timepicker.isAlertContains(toggleMinSec, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isAlertContains(toggleMinSec, `showMinutes: trueshowSeconds: false`);
  });

  it(`when user clicks on "Hide seconds" button again, then input and arrows with seconds shown,
     and info alert show "showSeconds: true"`, () => {
    const newDate = new Date();
    timepicker.clickOnBtn(toggleMinSec, 2);
    timepicker.clickOnBtn(toggleMinSec, 2);
    timepicker.isTimepickerInputExist(toggleMinSec, 'minutes');
    timepicker.isTimepickerInputExist(toggleMinSec, 'seconds');
    timepicker.isAlertContains(toggleMinSec, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isAlertContains(toggleMinSec, `showMinutes: trueshowSeconds: true`);
  });
});
