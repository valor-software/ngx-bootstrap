import {
  changeTime,
  createDate,
  isNumber,
  isValidDate,
  padNumber,
  parseHours,
  parseMinutes,
  parseSeconds,
  parseTime,
  setTime,
  toNumber
} from '../../timepicker/timepicker.utils';

function testTime(hours?: number, minutes?: number, seconds?: number) {
  const time = new Date();
  time.setHours(hours || 0);
  time.setMinutes(minutes || 0);
  time.setSeconds(seconds || 0);

  return time;
}

function modelTime(hours: string | number,
                   minutes: string | number,
                   second: string | number,
                   PM: boolean) {
  const time = {
    hour: hours || null,
    minute: minutes || null,
    seconds: second || null,
    isPM: PM || null
  };

  return time;
}

describe('Runtime coverage. Utils: Timepicker', () => {
  it('should is not empty', () => {
    isValidDate();
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
});
