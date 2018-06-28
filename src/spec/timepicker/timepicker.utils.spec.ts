import { Time, TimepickerComponentState } from '../../timepicker/timepicker.models';
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
                   second: string | number): Time {
  return {
    hour: hours || null,
    minute: minutes || null,
    seconds: second || null
  };
}


describe('Runtime coverage. Utils: Timepicker', () => {
  it('should validate time with blank value and return false', () => {
    expect(isValidDate()).toEqual(false);
  });

  it('should validate time and return true', () => {
    expect(isValidDate(testTime())).toEqual(true);
  });

  it('should validate time with invalid hours and return false', () => {
    const time = new Date();
    time.setHours(NaN);

    expect(isValidDate(time)).toEqual(false);
  });

  it('should validate date in string as valid', () => {
    expect(isValidDate('123')).toEqual(true);
  });

  it('should return numeric value', () => {
    expect(toNumber(12)).toEqual(12);
  });

  it('should convert number in string to numeric value', () => {
    expect(toNumber('12')).toEqual(12);
  });

  it('should return NaN with invalid value', () => {
    expect(toNumber('string')).toEqual(NaN);
  });

  it('should validate number in string as number', () => {
    expect(isNumber('12')).toEqual(true);
  });

  it('should parse hours valid value', () => {
    expect(parseHours(12)).toEqual(12);
  });

  it('should parse hours invalid value', () => {
    expect(parseHours('q')).toEqual(NaN);
  });

  it('should parse minutes valid value', () => {
    expect(parseMinutes(12)).toEqual(12);
  });

  it('should parse minutes invalid value', () => {
    expect(parseMinutes('q')).toEqual(NaN);
  });

  it('should parse seconds valid value', () => {
    expect(parseSeconds(60)).toEqual(60);
  });

  it('should parse seconds invalid value', () => {
    expect(parseSeconds('q')).toEqual(NaN);
  });

  it('should parse time string value', () => {
    const date = parseTime('12');

    expect(isValidDate(date)).toEqual(true);
  });

  it('should parse time date value', () => {
    const date = parseTime(testTime());

    expect(isValidDate(date)).toEqual(true);
  });

  it('should change time valid value', () => {
    const newDate = changeTime(testTime(), modelTime(1, 2, 3));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('1 2 3');
  });

  it('should change time with invalid diff', () => {
    const newDate: any = changeTime(testTime(), modelTime(-1, 0, 0));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('23 0 0');
  });

  it('should change time with invalid diff hour NaN', () => {
    const newDate: any = changeTime(testTime(), modelTime(NaN, 0, 0));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('0 0 0');
  });

  it('should set time opts true', () => {
    const newDate: Date = setTime(testTime(), modelTime(0, 0, 0));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('0 0 0');
  });

  it('should create date with correct hours value', () => {
    const newDate: Date = createDate(testTime(), 10, 0, 0);

    expect(newDate.getHours()).toEqual(10);
  });

  it('should create date with correct minutes value', () => {
    const newDate: Date = createDate(testTime(), 0, 20, 0);

    expect(newDate.getMinutes()).toEqual(20);
  });

  it('should create date with correct seconds value', () => {
    const newDate: Date = createDate(testTime(), 0, 0, 30);

    expect(newDate.getSeconds()).toEqual(30);
  });

  it('should pad number', () => {
    expect(padNumber(10)).toEqual('10');
  });

  it('should pad number length', () => {
    expect(padNumber(1)).toEqual('01');
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
    const result = isHourInputValid('3');

    expect(result).toEqual(true);
  });

  it('isHourInputValid method should validate hour and return false', () => {
    const result = isHourInputValid('78');

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
    const result = isInputValid('78', undefined, undefined);

    expect(result).toEqual(false);
  });

  it('isInputValid method should validate time and return true', () => {
    const result = isInputValid('5', '12', '30');

    expect(result).toEqual(true);
  });

  it('isInputLimitValid method should validate input according to the max limit and return false', () => {
    const date = modelTime(0, 0, 0);
    const max = changeTime(new Date(), modelTime(-1, 0, 0));

    const result = isInputLimitValid(date, max, null);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the min limit and return false', () => {
    const date = modelTime(0, 0, 0);
    const min = changeTime(new Date(), modelTime(0, 30, 0));

    const result = isInputLimitValid(date, null, min);

    expect(result).toEqual(false);
  });

  it('isInputLimitValid method should validate input according to the limits and return true', () => {
    const result = isInputLimitValid(modelTime(1, 0, 0), null, null);

    expect(result).toEqual(true);
  });

  it('setTime method should return correct time when entered string values', () => {
    const newDate: Date = setTime(testTime(), modelTime('test', 'test', 'test'));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('0 0 0');
  });

  it('setTime method should return correct time', () => {
    const newDate: Date = setTime(testTime(), modelTime(23, 30, 40));

    expect(`${newDate.getHours()} ${newDate.getMinutes()} ${newDate.getSeconds()}`)
      .toEqual('23 30 40');
  });

  it('parseHours method should validate 24 hours as valid value and return it', () => {
    expect(parseHours(24)).toEqual(24);
  });
});
