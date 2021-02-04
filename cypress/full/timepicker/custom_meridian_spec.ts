import { TimepickerPo } from '../../support/timepicker.po';

describe('Timepicker demo page testing suite: Custom meridian', () => {
  const timepicker = new TimepickerPo();
  const customMeridian = timepicker.exampleDemosArr.customMeridian;

  beforeEach(() => timepicker.navigateTo());

  it(`example contains timepicker component and info alert with selected date and time (current by default)
    see current hour and minute in timepicker inputs and button "12H"("24H") by default (current time)`, () => {
    const newDate = new Date();
    timepicker.isTimepickerVisible(customMeridian);
    timepicker.isAlertContains(customMeridian, `Time is: ${newDate.toString().split(':')[0]}`);
    timepicker.isInputValueContain(customMeridian, `${timepicker.getHoursIn12Format(newDate)}`, 0);
    timepicker.isInputValueContain(customMeridian, `${newDate.getMinutes()}`, 1);
    timepicker.isButtonExist(customMeridian,
      `${(newDate.getHours() >= 12) ? 'PM(Noon to Midnight)' : 'AM(Midnight to Noon)'} `, 0);
  });

  it(`when user clicks on "12H / 24H", then input data stay the same and alert changed appropriate`, () => {
    const currentHours = new Date().getHours();

    timepicker.getMeridianValue(customMeridian).then(firstMeridian => {
      timepicker.clickOnBtn(customMeridian);
      timepicker.getMeridianValue(customMeridian).then(secondMeridian => {
        expect(firstMeridian).not.to.equal(secondMeridian);
        timepicker.isAlertContains(customMeridian, `${currentHours + (currentHours >= 12 ? -12 : 12)}`);
      });
    });
  });

  it(`component src should be written with meridians = ['12H', '24H'],
    template src should be written with "meridians"`, () => {
    timepicker.isComponentSrcContain('Custom meridian', 'PM(Noon to Midnight)');
    timepicker.isComponentSrcContain('Custom meridian', 'AM(Midnight to Noon)');
    timepicker.isTemplateSrcContain('Custom meridian', '[meridians]="meridians"');
  });
});
