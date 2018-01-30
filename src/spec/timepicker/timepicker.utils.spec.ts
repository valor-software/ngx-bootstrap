import { Time, TimepickerComponentState } from '../../timepicker/timepicker.models';
import * as timepickerUtils from '../../timepicker/timepicker.utils';

const controls: TimepickerComponentState = {
  min: testTime(3, 0, 0),
  max: testTime(17, 0, 0),
  hourStep: 1,
  minuteStep: 1,
  secondsStep: 1,
  readonlyInput: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: false,
  showMeridian: true,
  showSeconds: true,
  meridians: ['AM', 'PM']
};

function testTime(hours?: number, minutes?: number, seconds?: number): Date {
  const time = new Date();
  time.setHours(hours || 0);
  time.setMinutes(minutes || 0);
  time.setSeconds(seconds || 0);

  return time;
}

function modelTime(hours: string | number,
                   minutes: string | number,
                   second: string | number,
                   PM: boolean): Time {
  return {
    hour: hours || null,
    minute: minutes || null,
    seconds: second || null,
    isPM: PM || null
  };
}

describe('Runtime coverage. Utils: Timepicker', () => {
  it('should is not empty', () => {
    timepickerUtils.isValidDate();
  });

  it('should is empty', () => {
    timepickerUtils.isValidDate(testTime());
  });

  it('should date is interface Data', () => {
    const time = new Date();
    time.setHours(NaN);
    timepickerUtils.isValidDate(time);
  });

  it('should date is string', () => {
    timepickerUtils.isValidDate('123');
  });

  it('should to number', () => {
    timepickerUtils.toNumber(12);
  });

  it('should to string', () => {
    timepickerUtils.toNumber('12');
  });

  it('should date is string', () => {
    timepickerUtils.isNumber('12');
  });

  it('should parse hours valid value', () => {
    timepickerUtils.parseHours(12);
  });

  it('should parse hours invalid value', () => {
    timepickerUtils.parseHours('q');
  });

  it('should parse minutes valid value', () => {
    timepickerUtils.parseMinutes(12);
  });

  it('should parse minutes invalid value', () => {
    timepickerUtils.parseMinutes('q');
  });

  it('should parse seconds valid value', () => {
    timepickerUtils.parseSeconds(12);
  });

  it('should parse seconds invalid value', () => {
    timepickerUtils.parseSeconds('q');
  });

  it('should parse time string value', () => {
    timepickerUtils.parseTime('12');
  });

  it('should parse time date value', () => {
    timepickerUtils.parseTime(testTime());
  });

  it('should change time valid value', () => {
    timepickerUtils.changeTime(testTime(), modelTime(1, 2, 3, true));
  });

  it('should change time invalid diff', () => {
    timepickerUtils.changeTime(testTime(), modelTime(-1, 0, 0, false));
  });

  it('should change time invalid diff hour NaN', () => {
    timepickerUtils.changeTime(testTime(), modelTime(NaN, 0, 0, false));
  });

  it('should set time opts true', () => {
    timepickerUtils.setTime(testTime(), modelTime(0, 0, 0, true));
  });

  it('should set time opts false', () => {
    timepickerUtils.setTime(testTime(), modelTime(0, 0, 0, false));
  });

  it('should set time opts hours NaN', () => {
    timepickerUtils.setTime(testTime(), modelTime(1, 1, 0, false));
  });

  it('should create date', () => {
    timepickerUtils.createDate(testTime(), 10, 20, 30);
  });

  it('should create date false', () => {
    timepickerUtils.createDate(testTime(), 10, 20, 30);
  });

  it('should pad number', () => {
    timepickerUtils.padNumber(10);
  });

  it('should pad number length', () => {
    timepickerUtils.padNumber(1);
  });

  it('isValidLimit method should validate the date according to the max limit and return false', () => {
    const date = testTime(18, 0, 0);

    const result = timepickerUtils.isValidLimit(controls, date);

    expect(result).toEqual(false);
  });

  it('isValidLimit method should validate the date according to the min limit and return false', () => {
    const date = testTime(2, 0, 0);

    const result = timepickerUtils.isValidLimit(controls, date);

    expect(result).toEqual(false);
  });

  it('isValidLimit method should validate the date according to the limits and return true', () => {
    const date = testTime(4, 0, 0);

    const result = timepickerUtils.isValidLimit(controls, date);

    expect(result).toEqual(true);
  });

  it('isHourInputValid method should validate hour and return true', () => {
    const result = timepickerUtils.isHourInputValid('3', true);

    expect(result).toEqual(true);
  });

  it('isHourInputValid method should validate hour and return false', () => {
    const result = timepickerUtils.isHourInputValid('78', false);

    expect(result).toEqual(false);
  });

  it('isMinuteInputValid method should validate minutes and return true', () => {
    const result = timepickerUtils.isMinuteInputValid('56');

    expect(result).toEqual(true);
  });

  it('isMinuteInputValid method should validate minutes and return false', () => {
    const result = timepickerUtils.isMinuteInputValid('78');

    expect(result).toEqual(false);
  });

  it('isSecondInputValid method should validate seconds and return true', () => {
    const result = timepickerUtils.isSecondInputValid('56');

    expect(result).toEqual(true);
  });

  it('isSecondInputValid method should validate seconds and return false', () => {
    const result = timepickerUtils.isSecondInputValid('78');

    expect(result).toEqual(false);
  });

  it('isInputValid method should validate time and return false', () => {
    const result = timepickerUtils.isInputValid('78', undefined, undefined, false);

    expect(result).toEqual(false);
  });

  it('isInputValid method should validate time and return true', () => {
    const result = timepickerUtils.isInputValid('5', '12', '30', true);

    expect(result).toEqual(true);
  });

  it('isInputLimitValid method should validate input according to the max limit and return false', () => {
    const date = modelTime(2, 0, 0, true);
    const max = timepickerUtils.changeTime(new Date(), modelTime(1, 0, 0, true));

    const result = timepickerUtils.isInputLimitValid(date, max, null);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the min limit and return false', () => {
    const date = modelTime(1, 0, 0, true);
    const min = timepickerUtils.changeTime(new Date(), modelTime(3, 0, 0, true));

    const result = timepickerUtils.isInputLimitValid(date, null, min);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the limits and return true', () => {
    const result = timepickerUtils.isInputLimitValid(modelTime(1, 0, 0, true), null, null);

    expect(result).toEqual(true);
  });
});
