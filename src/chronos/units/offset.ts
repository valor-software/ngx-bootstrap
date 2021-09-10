// FORMATTING

import { addFormatToken } from '../format/format';
import { zeroFill } from '../utils/zero-fill';
import { DateParsingConfig } from '../create/parsing.types';
import { isNumber, isString, toInt } from '../utils/type-checks';
import { addRegexToken, matchOffset, matchShortOffset } from '../parse/regex';
import { add } from '../moment/add-subtract';
import { addParseToken } from '../parse/token';
import { DateArray } from '../types';
import { cloneDate } from '../create/clone';
import { setMonth } from '../utils/date-setters';

function addOffsetFormatToken(token: string, separator: string): void {
  addFormatToken(token, null, null, function (date: Date, config): string {
    let offset = getUTCOffset(date, {_isUTC: config.isUTC, _offset: config.offset});
    let sign = '+';
    if (offset < 0) {
      offset = -offset;
      sign = '-';
    }

    return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
  });
}

export function initOffset() {
  addOffsetFormatToken('Z', ':');
  addOffsetFormatToken('ZZ', '');

// PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function(input: string, array: DateArray, config: DateParsingConfig): DateParsingConfig {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);

    return config;
  });
}

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
const chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher: RegExp, str: string): number {
  const matches = (str || '').match(matcher);

  if (matches === null) {
    return null;
  }

  const chunk = matches[matches.length - 1];
  const parts = chunk.match(chunkOffset) || ['-', '0', '0'];
  const minutes = parseInt(parts[1], 10) * 60 + toInt(parts[2]);
  const _min = parts[0] === '+' ? minutes : -minutes;

  return minutes === 0 ? 0 : _min;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
export function cloneWithOffset(input: Date, date: Date,
                                config: DateParsingConfig = {}): Date {
  if (!config._isUTC) {
    return input;
  }

  const res = cloneDate(date);
  // todo: input._d - res._d + ((res._offset || 0) - (input._offset || 0))*60000
  const offsetDiff = (config._offset || 0) * 60000;
  const diff = input.valueOf() - res.valueOf() + offsetDiff;
  // Use low-level api, because this fn is low-level api.
  res.setTime(res.valueOf() + diff);
  // todo: add timezone handling
  // hooks.updateOffset(res, false);

  return res;
}

export function getDateOffset(date: Date): number {
  // On Firefox.24 Date#getTimezoneOffset returns a floating point.
  // https://github.com/moment/moment/pull/1871
  return -Math.round(date.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
// todo: it's from moment timezones
// hooks.updateOffset = function () {
// };

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
export function getUTCOffset(date: Date, config: DateParsingConfig = {}): number {
  const _offset = config._offset || 0;

  return config._isUTC ? _offset : getDateOffset(date);
}

export function setUTCOffset(date: Date, input: number | string, keepLocalTime?: boolean, keepMinutes?: boolean, config: DateParsingConfig = {}): Date {
  const offset = config._offset || 0;
  let localAdjust;
  let _input = input;
  let _date = date;

  if (isString(_input)) {
    _input = offsetFromString(matchShortOffset, _input);
    if (_input === null) {
      return _date;
    }
  } else if (isNumber(_input) && Math.abs(_input) < 16 && !keepMinutes) {
    _input = _input * 60;
  }

  if (!config._isUTC && keepLocalTime) {
    localAdjust = getDateOffset(_date);
  }
  config._offset = _input;
  config._isUTC = true;
  if (localAdjust != null) {
    _date = add(_date, localAdjust, 'minutes');
  }
  if (offset !== _input) {
    if (!keepLocalTime || config._changeInProgress) {
      _date = add(_date, _input - offset, 'minutes', config._isUTC);
      // addSubtract(this, createDuration(_input - offset, 'm'), 1, false);
    } else if (!config._changeInProgress) {
      config._changeInProgress = true;
      // todo: add timezone handling
      // hooks.updateOffset(this, true);
      config._changeInProgress = null;
    }
  }

  return _date;
}

/*
export function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== 'string') {
      input = -input;
    }

    this.utcOffset(input, keepLocalTime);

    return this;
  } else {
    return -this.utcOffset();
  }
}
*/

export function setOffsetToUTC(date: Date, keepLocalTime?: boolean): Date {
  return setUTCOffset(date, 0, keepLocalTime);
}

export function isDaylightSavingTime(date: Date): boolean {

  return (getUTCOffset(date) > getUTCOffset(setMonth(cloneDate(date), 0))
    || getUTCOffset(date) > getUTCOffset(setMonth(cloneDate(date), 5)));
}

/*export function setOffsetToLocal(date: Date, isUTC?: boolean, keepLocalTime?: boolean) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;

    if (keepLocalTime) {
      this.subtract(getDateOffset(this), 'm');
    }
  }
  return this;
}*/

export function setOffsetToParsedOffset(date: Date, input: string, config: DateParsingConfig = {}): Date {
  if (config._tzm != null) {
    return setUTCOffset(date, config._tzm, false, true, config);
  }

  if (isString(input)) {
    const tZone = offsetFromString(matchOffset, input);
    if (tZone != null) {
      return setUTCOffset(date, tZone, false, false, config);
    }

    return setUTCOffset(date, 0, true, false, config);
  }

  return date;
}

export function hasAlignedHourOffset(date: Date, input?: Date) {
  const _input = input ? getUTCOffset(input, { _isUTC: false }) : 0;

  return (getUTCOffset(date) - _input) % 60 === 0;
}


// DEPRECATED
/*export function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }

  const c = {};

  copyConfig(c, this);
  c = prepareConfig(c);

  if (c._a) {
    const other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() &&
      compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }

  return this._isDSTShifted;
}*/

// in Khronos
/*export function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}

export function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}

export function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}*/
