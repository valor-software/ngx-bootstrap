import { Time, TimepickerComponentState } from '../../timepicker/timepicker.models';
import { TimepickerOffsetTarget } from '../../timepicker/timepicker.config';
import {
  isValidDate,
  isValidLimit,
  toNumber,
  isNumber,
  parseHours,
  parseMinutes,
  parseSeconds,
  parseTime,
  changeTime,
  setTime,
  createDate,
  padNumber,
  isHourInputValid,
  isMinuteInputValid,
  isSecondInputValid,
  isInputLimitValid,
  isInputValid
} from '../../timepicker/timepicker.utils';

const controls: TimepickerComponentState = {
  min: testTime(3, 0, 0),
  max: testTime(17, 0, 0),
  hourStep: 1,
  minuteStep: 1,
  secondsStep: 1,
  readonlyInput: false,
  disabled: false,
  mousewheel: true,
  arrowkeys: true,
  showSpinners: false,
  showMeridian: true,
  showSeconds: true,
  meridians: ['AM', 'PM'],
  offset: 0,
  offsetTarget: TimepickerOffsetTarget.Client
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

// todo: OMG
xdescribe('Runtime coverage. Utils: Timepicker', () => {
  it('should is not empty', () => {
    expect(isValidDate()).toBeTruthy();
  });

  it('should is empty', () => {
    isValidDate(testTime());
  });

  it('should date is interface Data', () => {
    const time = new Date();
    time.setHours(NaN);
    isValidDate(time);
  });

  it('should date is string', () => {
    isValidDate('123');
  });

  it('should to number', () => {
    toNumber(12);
  });

  it('should to string', () => {
    toNumber('12');
  });

  it('should date is string', () => {
    isNumber('12');
  });

  it('should parse hours valid value', () => {
    parseHours(12);
  });

  it('should parse hours invalid value', () => {
    parseHours('q');
  });

  it('should parse minutes valid value', () => {
    parseMinutes(12);
  });

  it('should parse minutes invalid value', () => {
    parseMinutes('q');
  });

  it('should parse seconds valid value', () => {
    parseSeconds(12);
  });

  it('should parse seconds invalid value', () => {
    parseSeconds('q');
  });

  it('should parse time string value', () => {
    parseTime('12');
  });

  it('should parse time date value', () => {
    parseTime(testTime());
  });

  it('should change time valid value', () => {
    changeTime(testTime(), modelTime(1, 2, 3, true));
  });

  it('should change time invalid diff', () => {
    changeTime(testTime(), modelTime(-1, 0, 0, false));
  });

  it('should change time invalid diff hour NaN', () => {
    changeTime(testTime(), modelTime(NaN, 0, 0, false));
  });

  it('should set time opts true', () => {
    setTime(testTime(), modelTime(0, 0, 0, true));
  });

  it('should set time opts false', () => {
    setTime(testTime(), modelTime(0, 0, 0, false));
  });

  it('should set time opts hours NaN', () => {
    setTime(testTime(), modelTime(1, 1, 0, false));
  });

  it('should create date', () => {
    createDate(testTime(), 10, 20, 30);
  });

  it('should create date false', () => {
    createDate(testTime(), 10, 20, 30);
  });

  it('should pad number', () => {
    padNumber(10);
  });

  it('should pad number length', () => {
    padNumber(1);
  });

  it('isValidLimit method should validate the date according to the max limit and return false', () => {
    const date = testTime(18, 0, 0);

    const result = isValidLimit(controls, date);

    expect(result).toEqual(false);
  });

  it('isValidLimit method should validate the date according to the min limit and return false', () => {
    const date = testTime(2, 0, 0);

    const result = isValidLimit(controls, date);

    expect(result).toEqual(false);
  });

  it('isValidLimit method should validate the date according to the limits and return true', () => {
    const date = testTime(4, 0, 0);

    const result = isValidLimit(controls, date);

    expect(result).toEqual(true);
  });

  it('isHourInputValid method should validate hour and return true', () => {
    const result = isHourInputValid('3', true);

    expect(result).toEqual(true);
  });

  it('isHourInputValid method should validate hour and return false', () => {
    const result = isHourInputValid('78', false);

    expect(result).toEqual(false);
  });

  it('isMinuteInputValid method should validate minutes and return true', () => {
    const result = isMinuteInputValid('56');

    expect(result).toEqual(true);
  });

  it('isMinuteInputValid method should validate minutes and return false', () => {
    const result = isMinuteInputValid('78');

    expect(result).toEqual(false);
  });

  it('isSecondInputValid method should validate seconds and return true', () => {
    const result = isSecondInputValid('56');

    expect(result).toEqual(true);
  });

  it('isSecondInputValid method should validate seconds and return false', () => {
    const result = isSecondInputValid('78');

    expect(result).toEqual(false);
  });

  it('isInputValid method should validate time and return false', () => {
    const result = isInputValid('78', undefined, undefined, false);

    expect(result).toEqual(false);
  });

  it('isInputValid method should validate time and return true', () => {
    const result = isInputValid('5', '12', '30', true);

    expect(result).toEqual(true);
  });

  it('isInputLimitValid method should validate input according to the max limit and return false', () => {
    const date = modelTime(0, 0, 0, true);
    const max = changeTime(new Date(), modelTime(-1, 0, 0, true));

    const result = isInputLimitValid(date, max, null);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the min limit and return false', () => {
    const date = modelTime(0, 0, 0, true);
    const min = changeTime(new Date(), modelTime(0, 30, 0, true));

    const result = isInputLimitValid(date, null, min);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the limits and return true', () => {
    const result = isInputLimitValid(modelTime(1, 0, 0, true), null, null);

    expect(result).toEqual(true);
  });
});
